import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {DatabaseService} from "../../core/database/database.service";
import {SortOrder} from "../../core/types/sort-order";
import {Product} from "../../core/entities/product";
import {CategoryService} from "../category/category.service";

@Injectable()
export class ProductService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryService.getCategoryById(createProductDto.category_number);
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    const result = await this.databaseService.query<Product>
    (
      `
          INSERT INTO product
          (category_number,
           product_name,
           characteristics)
          VALUES ($1, $2, $3) RETURNING *;
      `,
      [
        createProductDto.category_number,
        createProductDto.product_name,
        createProductDto.characteristics
      ]
    );

    return result.rows[0];
  }

  async getProductsSorted(sortOptions: {
    sort?: SortOrder,
    category_number?: number,
    name?: string
  }): Promise<Product[]> {
    const params: any[] = [];
    let query = 'SELECT * FROM product';

    if (sortOptions.category_number) {
      query += ` WHERE category_number = $${params.length + 1}`;
      params.push(sortOptions.category_number);
    }
    if (sortOptions.name) {
      if (params.length) query += ` AND`;
      else query += ` WHERE`;

      query += ` product_name ILIKE $${params.length + 1}`;
      params.push(sortOptions.name.toLowerCase() + "%");
    }
    if (sortOptions.sort) {
      query += ` ORDER BY product_name ${sortOptions.sort}`;
    }

    const result = await this.databaseService.query<Product>(query, params);
    return result.rows;
  }

  async getProductById(id_product: number): Promise<Product | null> {
    const result = await this.databaseService.query<Product>(
      'SELECT * FROM product WHERE id_product = $1', [id_product]
    );

    return result.rows.length ? result.rows[0] : null;
  }

  async update(id_product: number, updateProductDto: UpdateProductDto) {
    const product = await this.getProductById(id_product);
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    if (updateProductDto.category_number) {
      const category = await this.categoryService.getCategoryById(updateProductDto.category_number);
      if (!category) {
        throw new NotFoundException("Category not found");
      }
    }
    await this.databaseService.query(
      `
            UPDATE product
            SET category_number = $2,
                product_name    = $3,
                characteristics = $4
            WHERE id_product = $1
        `,
      [
        id_product,
        updateProductDto.category_number ?? product.category_number,
        updateProductDto.product_name ?? product.product_name,
        updateProductDto.characteristics ?? product.characteristics
      ]
    );

    return product;
  }

  async remove(id_product: number) {
    const product = await this.getProductById(id_product);
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    try {
      await this.databaseService.query(
        'DELETE FROM product WHERE id_product = $1',
        [id_product]
      );
    }catch (e) {
      if (e.code === '23503') { // Foreign key violation
        throw new ConflictException('There are Store Products associated with this category. Delete them first');
      }
    }
    return product;
  }

  async getNotSoldProducts(){
    const query = `
    SELECT 
    p.id_product,
    p.product_name
    FROM product p
    WHERE 
        NOT EXISTS (
            SELECT 1
            FROM store_product sp
            WHERE sp.id_product = p.id_product
        )
        AND NOT EXISTS (
            SELECT 1
            FROM sale s
            WHERE s.upc = (SELECT sp.upc FROM store_product sp WHERE sp.id_product = p.id_product LIMIT 1)
        );
    `;

    const result = await this.databaseService.query<{ id_product: number, product_name: string }>(query);

    return result.rows;
  }
}

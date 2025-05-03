import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {DatabaseService} from "../../core/database/database.service";
import {SortOrder} from "../../core/types/sort-order";
import {Category} from "../../core/entities/category";

@Injectable()
export class CategoryService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const result = await this.databaseService.query<Category>
    (
      `
          INSERT INTO category
          (category_name)
          VALUES ($1) RETURNING *;
      `,
      [
        createCategoryDto.category_name
      ]
    );

    return result.rows[0];
  }
  async getCategories(): Promise<Category[]> {
    const result = await this.databaseService.query<Category>(
      'SELECT * FROM category'
    );

    return result.rows;
  }
  async getCategoriesCardSortedByName(order: SortOrder): Promise<Category[]> {
    const result = await this.databaseService.query<Category>(
      `SELECT * FROM category ORDER BY category_name ${order}`
    );

    return result.rows;
  }
  async getCategoryById(category_number: number): Promise<Category> {
    const result = await this.databaseService.query<Category>
    (
      'SELECT * FROM category WHERE category_number = $1',
      [category_number]
    );

    return result.rows[0];
  }
  async update(category_number: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.getCategoryById(category_number);
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    await this.databaseService.query(
      `
        UPDATE category
        SET category_name = $2
        WHERE category_number = $1
      `,
      [
        category_number,
        updateCategoryDto.category_name ?? category.category_name,
      ]
    );

    return Object.assign(category, updateCategoryDto);
  }
  async remove(category_number: number) {
    const category = await this.getCategoryById(category_number);
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    try {
      await this.databaseService.query(
        'DELETE FROM category WHERE category_number = $1',
        [category_number]
      );
    }catch (e) {
      if (e.code === '23503') { // Foreign key violation
        throw new ConflictException('There are products associated with this category. Delete them first');
      }
    }

    return category;
  }
}

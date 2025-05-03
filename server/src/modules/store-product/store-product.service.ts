import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {DatabaseService} from "../../core/database/database.service";
import {CreateStoreProductDto} from "./dto/create-store-product.dto";
import {StoreProduct} from "../../core/entities/store-product";
import {SortOrder} from "../../core/types/sort-order";
import {UpdateStoreProductDto} from "./dto/update-store-product.dto";
import {async} from 'rxjs';
import {Product} from '../../core/entities/product';

@Injectable()
export class StoreProductService {
	constructor(
		private readonly databaseService: DatabaseService,
	) {
	}

	private readonly storeProductQuery = `
		SELECT 	store_product.*,
						json_build_object(
							'id_product', product.id_product,
							'product_name', product.product_name
						) as product
		FROM store_product
		INNER JOIN product ON store_product.id_product = product.id_product
	`;

	async create(createProductDto: CreateStoreProductDto): Promise<StoreProduct> {
		await this.databaseService.query('BEGIN');
		try {
			const storeProducts = await this.getStoreProductsByProductId(createProductDto.id_product, true);

			if (storeProducts.length >= 2) {
				throw new ConflictException('Following product already has 2 store products');
			}

			const includesPromotionalProduct = storeProducts.some((storeProduct) => storeProduct.promotional_product);
			const includesNonPromotionalProduct = storeProducts.length >= 1 && !includesPromotionalProduct;

			if (includesPromotionalProduct && createProductDto.promotional_product) {
				throw new ConflictException('Following product already has promotional store product');
			}
			if (includesNonPromotionalProduct && !createProductDto.promotional_product) {
				throw new ConflictException('Following product already has non-promotional store products');
			}

			let query = `
          INSERT INTO store_product
          (upc_prom,
           id_product,
           selling_price,
           products_number,
           promotional_product)
          VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `;
			const result = await this.databaseService.query<StoreProduct>
			(
				query,
				[
					createProductDto.promotional_product ? null : storeProducts[0]?.upc,
					createProductDto.id_product,
					createProductDto.selling_price,
					createProductDto.products_number,
					createProductDto.promotional_product,
				]
			);

			const createdStoreProduct = result.rows[0];

			if (createProductDto.promotional_product && includesNonPromotionalProduct) {
				query = `
            UPDATE store_product
            SET upc_prom = $1
            WHERE upc = $2;
        `;
				await this.databaseService.query
				(
					query,
					[
						createdStoreProduct.upc,
						storeProducts[0]!.upc,
					]
				);
			}

			await this.databaseService.query('COMMIT');
			return result.rows[0];
		} catch (e) {
			await this.databaseService.query('ROLLBACK');

			// Handle unique constant violation
			if (e.code === '23505') {
				throw new ConflictException('Store product with this UPC already exists');
			}

			// Handle foreign key violation
			if (e.code === '23503') {
				throw new NotFoundException('Product or Store_Product not found');
			}

			throw e;
		}
	}

	async getStoreProductByUpc(upc: string, forUpdate: boolean = false): Promise<StoreProduct | null> {
		const result = await this.databaseService.query<StoreProduct>(
			`SELECT * FROM store_product WHERE upc = $1 ${forUpdate ? 'FOR UPDATE' : ''}`, [upc]
		);

		return result.rows.length ? result.rows[0] : null;
	}

	async getStoreProductByUpcWithProductInfo(upc: string): Promise<StoreProduct> {
		let query = this.storeProductQuery;
		query += ` WHERE store_product.upc = $1`;

		const result = await this.databaseService.query<StoreProduct & Product>(
			query, [upc]
		);

		const storeProduct = result.rows.length ? result.rows[0] : null;

		if (!storeProduct) {
			throw new NotFoundException('Store product not found');
		}

		return storeProduct;
	}

	async queryStoreProduct(sortOptions: {
		sortByAmount?: SortOrder,
		sortByName?: SortOrder,
		promotionalProduct?: boolean,
		name?: string,
	}): Promise<StoreProduct[]> {
		const params: any[] = [];
		let query = this.storeProductQuery;

		if (sortOptions.promotionalProduct !== undefined) {
			query += ` WHERE promotional_product = $1`;
			params.push(sortOptions.promotionalProduct);
		}

		if (sortOptions.sortByName) {
			query += `
          ORDER BY product.product_name ${sortOptions.sortByName}
      `
		}

		if (sortOptions.sortByAmount) {
			if (sortOptions.sortByName) {
				query += `,`;
			} else {
				query += ` ORDER BY`;
			}
			query += ` products_number ${sortOptions.sortByAmount}`;
		}

		if (sortOptions.name) {
			query += ` WHERE product.product_name ILIKE '%' || $${params.length + 1} || '%'`;
			params.push(sortOptions.name);
		}

		const result = await this.databaseService.query<StoreProduct>(query, params);
		return result.rows;
	}

	async getStoreProductsByProductId(id_product: number, forUpdate: boolean = false): Promise<StoreProduct[]> {
		const query = `
      SELECT * FROM store_product WHERE id_product = $1 ${forUpdate ? 'FOR UPDATE' : ''};
    `;

		const result =
			await this.databaseService.query<StoreProduct>(query, [id_product]);

		return result.rows
	}

	async deleteStoreProduct(upc: string): Promise<StoreProduct> {
		await this.databaseService.query(`BEGIN`);

		try {
			const storeProduct = await this.getStoreProductByUpc(upc, true);
			if (!storeProduct) {
				throw new NotFoundException('Store product not found');
			}

			await this.databaseService.query(`DELETE FROM store_product WHERE upc = $1;`, [upc]);
			await this.databaseService.query(`UPDATE store_product SET upc_prom = NULL WHERE id_product = $1;`, [storeProduct.id_product]);
			await this.databaseService.query(`COMMIT`);
			return storeProduct;
		} catch (e) {
			await this.databaseService.query(`ROLLBACK`);
			if (e.code === '23503') {  // Foreign key violation
				throw new NotFoundException('There is Receipts associated with this Store Product. Delete them first.');
			}

			throw e;
		}
	}

	async updateStoreProduct(upc: string, updateStoreProductDto: UpdateStoreProductDto): Promise<StoreProduct> {
		await this.databaseService.query(`BEGIN`);

		try {
			const storeProduct = await this.getStoreProductByUpc(upc, true);
			if (!storeProduct) {
				throw new NotFoundException('Store product not found');
			}

			if (
				updateStoreProductDto.promotional_product !== undefined &&
				updateStoreProductDto.promotional_product !== storeProduct.promotional_product
			) {
				const storeProducts = await this.getStoreProductsByProductId(storeProduct.id_product, true);
				const anotherStoreProduct = storeProducts.find((sp) => sp.upc !== upc);

				// Check if there is another store product associated with this product
				// Because there can be only one promotional product and one non-promotional product for one product
				// So if there is two store products, that means that one is promotional and one is non-promotional
				// So if we try to each of them, there will be conflict
				if (anotherStoreProduct)
					throw new ConflictException(
						'You cannot change "promotional_product" field if there is another store product associated with this product'
					);
			}

			let updateQuery = `UPDATE store_product SET`;
			const params: any[] = [];

			if (updateStoreProductDto.upc !== undefined) {
				updateQuery += ` upc = $${params.length + 1}`;
				params.push(updateStoreProductDto.upc);
			}
			if (updateStoreProductDto.selling_price !== undefined) {
				updateQuery += `${params.length > 0 ? ',' : ''} selling_price = $${params.length + 1}`;
				params.push(updateStoreProductDto.selling_price);
			}
			if (updateStoreProductDto.products_number !== undefined) {
				updateQuery += `${params.length > 0 ? ',' : ''} products_number = $${params.length + 1}`;
				params.push(updateStoreProductDto.products_number);
			}
			if (updateStoreProductDto.promotional_product !== undefined) {
				updateQuery += `${params.length > 0 ? ',' : ''} promotional_product = $${params.length + 1}`;
				params.push(updateStoreProductDto.promotional_product);
			}

			updateQuery += ` WHERE upc = $${params.length + 1}`;
			params.push(upc);
			if (params.length === 1) throw new BadRequestException('Please provide at least one field to update');

			await this.databaseService.query(updateQuery, params);
			await this.databaseService.query(`COMMIT`);

			return Object.assign(storeProduct, updateStoreProductDto);
		} catch (e) {
			await this.databaseService.query(`ROLLBACK`);
			if (e.code === '23505' && e.constraint === 'store_product_pkey') {  // UNIQUE constraint violation
				throw new ConflictException('Store Product with this UPC already exists');
			}

			throw e;
		}
	}
}

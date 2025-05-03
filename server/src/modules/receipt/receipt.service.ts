import {Injectable, NotFoundException} from '@nestjs/common';
import {DatabaseService} from "../../core/database/database.service";
import { CustomerCard } from '../../core/entities/customer-card'
import {Receipt} from "../../core/entities/receipt";
import { CustomerCardService } from '../customer-card/customer-card.service'
import {CreateReceiptDto} from "./dto/create-receipt.dto";
import {Employee} from "../../core/entities/employee";

@Injectable()
export class ReceiptService {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly customerCardService: CustomerCardService,
	) {
	}
	private receiptQuery = `
      	SELECT 
					receipt.*,
					json_build_object(
					  'id_employee', employee.id_employee,
					  'empl_surname', employee.empl_surname,
				    'empl_name', employee.empl_name
					) as employee,
					CASE 
						WHEN customer_card.card_number IS NULL THEN NULL
						ELSE json_build_object(
						'card_number', customer_card.card_number,
						'cust_surname', customer_card.cust_surname,
						'cust_name', customer_card.cust_name
						)
					END AS customer,
					(
						SELECT json_agg(json_build_object(
							'upc', store_product.upc,
							'product_number', sale.product_number,
							'selling_price', sale.selling_price,
							'product_name', product.product_name
						))
						FROM receipt AS receipt1
						INNER JOIN sale ON receipt1.receipt_number = sale.receipt_number
						INNER JOIN store_product ON store_product.upc = sale.upc
						INNER JOIN product ON store_product.id_product = product.id_product
						WHERE receipt1.receipt_number = receipt.receipt_number
					) AS items
				FROM receipt
				INNER JOIN employee ON employee.id_employee = receipt.id_employee
				LEFT JOIN customer_card ON customer_card.card_number = receipt.card_number
    `;

	async create(employee: Employee, createReceiptDto: CreateReceiptDto) {
		const transactionClient = await this.databaseService.getClient();

		try {
			await transactionClient.query('BEGIN');
			const getProductsQuery = `
        SELECT upc, products_number, selling_price FROM store_product
        WHERE upc = ANY($1)
        FOR UPDATE;
      `;
			const productsResult = await transactionClient.query
				< {upc: string, products_number: number, selling_price: number} >
				(
					getProductsQuery, [createReceiptDto.products.map(product => product.upc)]
				);

			if (productsResult.rows.length < createReceiptDto.products.length) {
				const notFoundProducts = createReceiptDto.products.filter(product => !productsResult.rows.some(row => row.upc === product.upc));
				throw new NotFoundException(`Products with UPC ${notFoundProducts.map(product => product.upc).join(', ')} not found or you provided two same UPCs`);
			}

			// Check if all products are available
			// Map with key as UPC and value as [products_number, selling_price]
			const products = new Map<string, [number, number]>();
			for (const row of productsResult.rows) {
				products.set(row.upc, [row.products_number, row.selling_price]);
			}
			for (const product of createReceiptDto.products) {
				const [availableStock] = products.get(product.upc);
				if (!availableStock || availableStock < product.products_number) {
					throw new NotFoundException(`Product with UPC ${product.upc} not found or insufficient stock`);
				}
			}

			let customerCard: CustomerCard;
			if (createReceiptDto.card_number) {
				customerCard = await this.customerCardService.getCustomerCardByCardNumber(createReceiptDto.card_number);
				if (!customerCard) {
					throw new NotFoundException(`Customer card number does not exist`);
				}
			}


			// Calculate total sum
			let totalSum = createReceiptDto.products.reduce(
				(sum, product) => sum + product.products_number * products.get(product.upc)[1], 0
			);
			const customerSale = (customerCard?.percent ? customerCard?.percent * 0.01 : 0) * totalSum;

			totalSum -= customerSale;

			// Insert receipt
			const insertQuery = `
			  INSERT INTO receipt (id_employee, card_number, sum_total, vat)
			  VALUES ($1, $2, $3, $4)
			  RETURNING *;
			`;
			const values = [
				employee.id_employee,
				createReceiptDto.card_number,
				totalSum * 1.2,
				totalSum * 0.2
			];
			const result = await transactionClient.query<Receipt>(insertQuery, values);
			const receipt = result.rows[0];

			// Insert sales
			const insertSaleValues = [];
			for (const product of createReceiptDto.products) {
				insertSaleValues.push([receipt.receipt_number, product.upc, product.products_number, products.get(product.upc)[1]]);
			}
			const insertSaleQuery = `
				INSERT INTO sale (receipt_number, upc, product_number, selling_price)
				VALUES ${insertSaleValues.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(', ')}
			`;
			await transactionClient.query(insertSaleQuery, insertSaleValues.flat());

			// Update product stock
			const updateProductQueries = [];
			for (const product of createReceiptDto.products) {
				const [availableStock] = products.get(product.upc);
				const newStock = availableStock - product.products_number;
				updateProductQueries.push(`
					UPDATE store_product
					SET products_number = $1
					WHERE upc = $2
				`);
				updateProductQueries.push(
					transactionClient.query(updateProductQueries[updateProductQueries.length - 1], [newStock, product.upc])
				);
			}
			await Promise.all(updateProductQueries);
			await transactionClient.query('COMMIT');
			transactionClient.release();

			return receipt;
		} catch (e) {
			await transactionClient.query('ROLLBACK');
			transactionClient.release();
			// Handle foreign key violation
			if (e.code === '23503' && e.constraint === 'fk_receipt_id_employee') {
				throw new NotFoundException('Employee not found');
			}
			if (e.code === '23503' && e.constraint === 'fk_receipt_customer_card') {
				throw new NotFoundException('Card Number not found');
			}

			throw e;
		}
	}
	async getReceiptById(receipt_number: string): Promise<Receipt | null> {
		let query = this.receiptQuery;
		query += ` WHERE receipt.receipt_number = $1`;
		const result = await this.databaseService.query<Receipt>(query, [receipt_number]);

		const receipt = result.rows.length ? result.rows[0] : null;

		if (!receipt) {
			throw new NotFoundException("Receipt not found");
		}

		return receipt
	}
	async remove(receipt_number: string): Promise<Receipt> {
		const receipt = await this.getReceiptById(receipt_number);
		if (!receipt) {
			throw new NotFoundException('Receipt not found');
		}

		const query = `
      DELETE FROM receipt
      WHERE receipt_number = $1
    `;

		await this.databaseService.query(query, [receipt_number]);

		return receipt;
	}
	async queryReceipts(sortOptions: {
		employee_id?: string;
		startDate?: Date;
		endDate?: Date;
	}): Promise<Receipt[]> {
		let query = this.receiptQuery;
		const values = [];

		if (sortOptions.employee_id !== undefined) {
			query += ` WHERE receipt.id_employee = $${values.length + 1}`;
			values.push(sortOptions.employee_id);
		}
		if (sortOptions.startDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} receipt.print_date >= $${values.length + 1}`;
			values.push(sortOptions.startDate);
		}
		if (sortOptions.endDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} receipt.print_date <= $${values.length + 1}`;
			values.push(sortOptions.endDate);
		}

		const receiptQueryResult = await this.databaseService.query<Receipt>(query, values);
		return receiptQueryResult.rows;
	}
	async getReceiptsSum(params: {
		employee_id?: string;
		startDate?: Date;
		endDate?: Date;
	}): Promise<{ totalSum: number }> {
		let query = `
			SELECT 
			SUM(sale.selling_price * sale.product_number) as total_sum
			FROM receipt
			INNER JOIN sale ON sale.receipt_number = receipt.receipt_number
		`
		const values = [];

		if (params.employee_id !== undefined) {
			query += ` WHERE receipt.id_employee = $${values.length + 1}`;
			values.push(params.employee_id);
		}

		if (params.startDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} receipt.print_date >= $${values.length + 1}`;
			values.push(params.startDate);
		}

		if (params.endDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} receipt.print_date <= $${values.length + 1}`;
			values.push(params.endDate);
		}

		const result = await this.databaseService.query<{ total_sum: number }>(query, values);
		return {totalSum: result.rows[0].total_sum}
	}
	async findUserLastReceipts(employee: Employee): Promise<Receipt[]> {
		const query = `
			SELECT * FROM receipt
			WHERE id_employee = $1
			AND print_date >= CURRENT_DATE
			ORDER BY print_date DESC;
		`;
		const result = await this.databaseService.query<Receipt>(query, [employee.id_employee]);

		return result.rows;
	}
	async getSoldProductsCount(params: {productId: string, startDate?: Date, endDate?: Date}): Promise<{productCount: number}> {
		let query = `
				SELECT SUM(sale.product_number) AS product_count FROM receipt
				INNER JOIN sale ON receipt.receipt_number = sale.receipt_number
				INNER JOIN store_product ON store_product.upc = sale.upc
				INNER JOIN product ON store_product.id_product = product.id_product
		`;
		const values = [];

		query += ` WHERE product.id_product = $1`;
		values.push(params.productId);

		if (params.startDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} receipt.print_date >= $${values.length + 1}`;
			values.push(params.startDate);
		}

		if (params.endDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} receipt.print_date <= $${values.length + 1}`;
			values.push(params.endDate);
		}

		query += ` GROUP BY product.id_product`;

		const result = await this.databaseService.query<{ product_count: number }>(query, values);
		return {productCount: result.rows[0]?.product_count ?? 0}
	}
	async getSummaryByCategory(){
		const query = `
		SELECT 
    category.category_number,
		category.category_name,
    SUM(sale.selling_price * sale.product_number) AS total_sales
		FROM 
				sale
		JOIN 
				store_product store_product ON sale.upc = store_product.upc
		JOIN 
				product ON store_product.id_product = product.id_product
		JOIN 
				category ON product.category_number = category.category_number
		JOIN 
				receipt ON sale.receipt_number = receipt.receipt_number
		WHERE 
				receipt.print_date >= CURRENT_DATE - INTERVAL '1 month'
		GROUP BY category.category_number, category.category_name
		ORDER BY 
				total_sales DESC;
		`;

		const receiptQueryResult =
			await this.databaseService.query<{category_name: string, total_sales: number, category_number: number}>(query);

		return receiptQueryResult.rows;
	}
}

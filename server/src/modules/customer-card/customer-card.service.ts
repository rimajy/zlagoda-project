import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCustomerCardDto } from './dto/create-customer-card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer-card.dto';
import {DatabaseService} from "../../core/database/database.service";
import {CustomerCard} from "../../core/entities/customer-card";
import {SortOrder} from "../../core/types/sort-order";

@Injectable()
export class CustomerCardService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCustomerCardDto: CreateCustomerCardDto): Promise<CustomerCard> {
    const result = await this.databaseService.query<CustomerCard>
    (
      `
          INSERT INTO customer_card
          (
           cust_surname,
           cust_name,
           cust_patronymic,
           phone_number,
           city,
           street,
           zip_code,
           percent)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
      `,
      [
        createCustomerCardDto.cust_surname,
        createCustomerCardDto.cust_name,
        createCustomerCardDto.cust_patronymic,
        createCustomerCardDto.phone_number,
        createCustomerCardDto.city,
        createCustomerCardDto.street,
        createCustomerCardDto.zip_code,
        createCustomerCardDto.percent,
      ]
    );

    return result.rows[0];
  }
  async getCustomerCards(): Promise<CustomerCard[]> {
    const result = await this.databaseService.query<CustomerCard>(
      'SELECT * FROM customer_card'
    );

    return result.rows;
  }
  async getCustomerCardSorted(sortOptions: {
    sort?: SortOrder,
    cust_surname?: string,
    percent?: number
  }): Promise<CustomerCard[]> {
    let query = `SELECT * FROM customer_card`;
    const values = [];

    if (sortOptions.cust_surname !== undefined) {
      query += ` WHERE cust_surname ILIKE $${values.length + 1}`;
      values.push(`${sortOptions.cust_surname}%`);
    }

    if (sortOptions.percent !== undefined) {
      query += ` ${values.length > 0 ? "AND" : "WHERE"} percent = $${values.length + 1}`;
      values.push(sortOptions.percent);
    }

    if (sortOptions.sort !== undefined) {
      query += ` ORDER BY cust_surname ${sortOptions.sort}`;
    }

    const result = await this.databaseService.query<CustomerCard>(query, values);
    return result.rows;
  }
  async getCustomerCardByCardNumber(card_number: string, forUpdate: boolean = false): Promise<CustomerCard | null> {
    const result = await this.databaseService.query<CustomerCard>(
      `SELECT * FROM customer_card WHERE card_number = $1 ${forUpdate ? 'FOR UPDATE' : ''}`, [card_number]
    );

    return result.rows.length ? result.rows[0] : null;
  }
  async update(card_number: string, updateCustomerCardDto: UpdateCustomerCardDto) {
    const customerCard = await this.getCustomerCardByCardNumber(card_number);
    if (!customerCard) {
      throw new NotFoundException("Card not found");
    }

    await this.databaseService.query(
      `
          UPDATE customer_card
          SET cust_surname = $2,
              cust_name = $3,
              cust_patronymic = $4,
              phone_number = $5,
              city = $6,
              street = $7,
              zip_code = $8,
              percent = $9
          WHERE card_number = $1
      `,
      [
        card_number,
        updateCustomerCardDto.cust_surname !== undefined ? updateCustomerCardDto.cust_surname : customerCard.cust_surname,
        updateCustomerCardDto.cust_name !== undefined ? updateCustomerCardDto.cust_name : customerCard.cust_name,
        updateCustomerCardDto.cust_patronymic !== undefined ? updateCustomerCardDto.cust_patronymic : customerCard.cust_patronymic,
        updateCustomerCardDto.phone_number !== undefined ? updateCustomerCardDto.phone_number : customerCard.phone_number,
        updateCustomerCardDto.city !== undefined ? updateCustomerCardDto.city : customerCard.city,
        updateCustomerCardDto.street !== undefined ? updateCustomerCardDto.street : customerCard.street,
        updateCustomerCardDto.zip_code !== undefined ? updateCustomerCardDto.zip_code : customerCard.zip_code,
        updateCustomerCardDto.percent !== undefined ? updateCustomerCardDto.percent : customerCard.percent,
      ]
    );

    return await this.getCustomerCardByCardNumber(card_number);
  }
  async remove(card_number: string) {
    const customerCard = await this.getCustomerCardByCardNumber(card_number);
    if (!customerCard) {
      throw new NotFoundException("Card not found");
    }

    try {
      await this.databaseService.query(
        'DELETE FROM customer_card WHERE card_number = $1',
        [card_number]
      );
    }
    catch(e) {
      if (e.code === '23503') { // Foreign key violation
        throw new ConflictException('There are receipts associated with this customer. Delete them first');
      }
    }

    return customerCard;
  }
}

import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {Pool} from 'pg';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(configService: ConfigService) {
    this.pool = new Pool({
      user: configService.getOrThrow('DB_USER'),
      password: configService.getOrThrow('DB_PASSWORD'),
      host: configService.getOrThrow('DB_HOST'),
      port: configService.getOrThrow('DB_PORT'),
      database: configService.getOrThrow('DB_DATABASE'),
      max: 10,
    });
  }

  async onModuleInit() {
    await this.pool.connect();
    console.log('Connected to Database');
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('Disconnected to Database');
  }

  async query<T>(text: string, params?: any[]) {
    return this.pool.query<T>(text, params);
  }

  async getClient() {
    return this.pool.connect();
  }

  async seed() {
    console.log('Processing seed...');
    try {
      await this.query('BEGIN;');
      await this.query(
        `
          CREATE TYPE EMPLOYEE_ROLE AS ENUM ('MANAGER', 'CASHIER');
          
          CREATE SEQUENCE employee_id_employee_seq START 1 INCREMENT 1;
          CREATE TABLE IF NOT EXISTS employee
          (
            id_employee VARCHAR(10) PRIMARY KEY DEFAULT LPAD(nextval('employee_id_employee_seq')::TEXT, 10, '0'),
            
            login VARCHAR(50) UNIQUE,
            password_hash VARCHAR(100) NOT NULL,
            
            empl_surname VARCHAR(50) NOT NULL,
            empl_name VARCHAR(50) NOT NULL,
            empl_patronymic VARCHAR(50),
            empl_role EMPLOYEE_ROLE NOT NULL,
            salary DECIMAL(13,4) NOT NULL CHECK (salary >= 0),
            date_of_birth DATE NOT NULL,
            date_of_start DATE NOT NULL,
            phone_number VARCHAR(13) NOT NULL,
            city VARCHAR(50) NOT NULL,
            street VARCHAR(50) NOT NULL,
            zip_code VARCHAR(9) NOT NULL
  
            CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '18 years')
          );
          
          CREATE TABLE IF NOT EXISTS product
          (
            id_product SERIAL PRIMARY KEY,
            category_number INT NOT NULL,
            product_name VARCHAR(50) NOT NULL,
            characteristics VARCHAR(100) NOT NULL
          );
          
          CREATE SEQUENCE store_product_upc_seq START 1 INCREMENT 1;
          CREATE TABLE IF NOT EXISTS store_product
          (
            upc VARCHAR(12) PRIMARY KEY DEFAULT LPAD(nextval('store_product_upc_seq')::TEXT, 12, '0'),
            upc_prom VARCHAR(12),
            id_product INT NOT NULL,
            selling_price DECIMAL(13,4) NOT NULL CHECK (selling_price >= 0),
            products_number INT NOT NULL CHECK (products_number >= 0),
            promotional_product BOOLEAN NOT NULL
          );
          
          CREATE SEQUENCE receipt_receipt_number_seq START 1 INCREMENT 1;
          CREATE TABLE IF NOT EXISTS receipt
          (
            receipt_number VARCHAR(10) PRIMARY KEY DEFAULT LPAD(nextval('receipt_receipt_number_seq')::TEXT, 10, '0'),
            id_employee VARCHAR(10) NOT NULL,
            card_number VARCHAR(13),
            print_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            sum_total DECIMAL(13,4) NOT NULL CHECK (sum_total >= 0),
            vat DECIMAL(13,4) NOT NULL CHECK (vat >= 0)
          );
          
          CREATE TABLE IF NOT EXISTS category
          (
            category_number SERIAL PRIMARY KEY,
            category_name VARCHAR(50) NOT NULL
          );
          
          CREATE TABLE IF NOT EXISTS sale
          (
            upc VARCHAR(12) NOT NULL,
            receipt_number VARCHAR(10) NOT NULL,
            product_number INT NOT NULL,
            selling_price DECIMAL(13,4) NOT NULL CHECK (selling_price >= 0),
            
            CONSTRAINT PK_Sale PRIMARY KEY (upc,receipt_number)
          );
          
          CREATE SEQUENCE customer_card_card_number_seq START 1 INCREMENT 1;
          CREATE TABLE IF NOT EXISTS customer_card
          (
            card_number VARCHAR(13) PRIMARY KEY DEFAULT LPAD(nextval('customer_card_card_number_seq')::TEXT, 13, '0'),
            cust_surname VARCHAR(50) NOT NULL,
            cust_name VARCHAR(50) NOT NULL,
            cust_patronymic VARCHAR(50),
            phone_number VARCHAR(13) NOT NULL,
            city VARCHAR(50),
            street VARCHAR(50),
            zip_code VARCHAR(9),
            percent INT NOT NULL CHECK (percent >= 0)
          );
          
          ALTER TABLE Product ADD CONSTRAINT FK_Product_Category 
          FOREIGN KEY (category_number) REFERENCES Category(category_number)
          ON DELETE NO ACTION ON UPDATE CASCADE;
          
          ALTER TABLE store_product ADD CONSTRAINT FK_store_product_store_Product
          FOREIGN KEY (upc_prom) REFERENCES store_product(upc)
          ON DELETE SET NULL ON UPDATE CASCADE;
          
          ALTER TABLE store_product ADD CONSTRAINT FK_store_product_product
          FOREIGN KEY (id_product) REFERENCES product(id_product)
          ON DELETE NO ACTION ON UPDATE CASCADE;
          
          ALTER TABLE receipt ADD CONSTRAINT FK_receipt_employee
          FOREIGN KEY (id_employee) REFERENCES employee(id_employee)
          ON DELETE NO ACTION ON UPDATE CASCADE;
          
          ALTER TABLE receipt ADD CONSTRAINT FK_receipt_customer_card
          FOREIGN KEY (card_number) REFERENCES customer_Card(card_number)
          ON DELETE NO ACTION ON UPDATE CASCADE;
          
          ALTER TABLE sale ADD CONSTRAINT FK_sale_store_product
          FOREIGN KEY (upc) REFERENCES store_product(upc)
          ON DELETE NO ACTION ON UPDATE CASCADE;
          
          ALTER TABLE sale ADD CONSTRAINT FK_sale_receipt
          FOREIGN KEY (receipt_number) REFERENCES receipt (receipt_number)
          ON DELETE CASCADE ON UPDATE CASCADE;
       
      `
      );
      await this.query('COMMIT;');
    }catch (error) {
      await this.query('ROLLBACK;');
      console.error(error);
    }
  }
}

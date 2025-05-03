import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {DatabaseService} from "../../core/database/database.service";
import {Employee} from "../../core/entities/employee";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import * as argon2 from "argon2";
import {UpdateEmployeeDto} from "./dto/update-employee.dto";
import {SortOrder} from "../../core/types/sort-order";

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {
  }

  async getEmployeeByLogin(login: string): Promise<Employee | null> {
    const result = await this.databaseService.query<Employee>(
      'SELECT * FROM employee WHERE login = $1', [login]
    );
    return result.rows.length ? result.rows[0] : null;
  }
  async getEmployeesSorted(sortOptions : {
    order?: SortOrder,
    surname?: string
  }): Promise<Employee[]> {
    let query = `SELECT * FROM employee`;
    const values = [];

    if (sortOptions.surname) {
      query += ` WHERE empl_surname ILIKE $1`;
      values.push(`${sortOptions.surname}%`);
    }

    if (sortOptions.order) {
      query += ` ORDER BY empl_surname ${sortOptions.order}`;
    }

    const result = await this.databaseService.query<Employee>(query, values);
    return result.rows;
  }
  async getEmployeeById(id_employee: string, forUpdate: boolean = false): Promise<Employee | null> {
    const result = await this.databaseService.query<Employee>(
      `SELECT * FROM employee WHERE id_employee = $1 ${forUpdate ? 'FOR UPDATE' : ''}`, [id_employee]
    );

    return result.rows.length ? result.rows[0] : null;
  }
  async createEmployee(employee: CreateEmployeeDto): Promise<Employee> {
    const existingEmployee = await this.getEmployeeByLogin(employee.login);
    if (existingEmployee) {
      throw new ConflictException('Employee with this login already exists');
    }

    const result = await this.databaseService.query<Employee>
    (
      `
          INSERT INTO employee
          (login,
           password_hash,
           empl_surname,
           empl_name,
           empl_patronymic,
           empl_role,
           salary,
           date_of_birth,
           date_of_start,
           phone_number,
           city,
           street,
           zip_code)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8::date, $9::date, $10, $11, $12, $13) RETURNING *;
      `,
      [
        employee.login,
        await this.createPasswordHash(employee.password),
        employee.empl_surname,
        employee.empl_name,
        employee.empl_patronymic,
        employee.empl_role,
        employee.salary,
        new Date(employee.date_of_birth),
        new Date(employee.date_of_start),
        employee.phone_number,
        employee.city,
        employee.street,
        employee.zip_code
      ]
    );

    return result.rows[0];
  }
  async deleteEmployee(authorEmployee: Employee, id_employee: string): Promise<Employee> {
    if (authorEmployee.id_employee === id_employee)
      throw new BadRequestException('You cannot delete your own profile');

    const employee = await this.getEmployeeById(id_employee);
    if (!employee) throw new NotFoundException('Employee with this id not found');

    await this.databaseService.query<Employee>(
      `
          DELETE FROM employee
          WHERE id_employee = $1
      `,
      [id_employee]
    );

    return employee;
  }
  async updateEmployee(id_employee: string, body: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.getEmployeeById(id_employee);
    if (!employee)
      throw new NotFoundException('Employee with this id not found');

    await this.databaseService.query(
      `
        UPDATE employee
        SET empl_surname = $2,
            empl_name = $3,
            empl_patronymic = $4,
            empl_role = $5,
            salary = $6,
            date_of_birth = $7::timestamp,
            date_of_start = $8::timestamp,
            phone_number = $9,
            city = $10,
            street = $11,
            zip_code = $12
        WHERE id_employee = $1
      `,
      [
        id_employee,
        body.empl_surname ?? employee.empl_surname,
        body.empl_name ?? employee.empl_name,
        body.empl_patronymic ?? employee.empl_patronymic,
        body.empl_role ?? employee.empl_role,
        body.salary ?? employee.salary,
        new Date(body.date_of_birth ?? employee.date_of_birth),
        new Date(body.date_of_start ?? employee.date_of_start),
        body.phone_number ?? employee.phone_number,
        body.city ?? employee.city,
        body.street ?? employee.street,
        body.zip_code ?? employee.zip_code
      ]
    );

    return employee;
  }
  async getEmployeeThatHaventServedHighDiscountClients(): Promise<Employee[]> {
    const query = `
      SELECT e.*
      FROM employee e
      WHERE NOT EXISTS (
          SELECT 1
          FROM receipt r
          JOIN customer_card ON r.card_number = customer_card.card_number
          WHERE r.id_employee = e.id_employee 
            AND NOT (customer_card.percent < 10)
      );
    `;

    const result = await this.databaseService.query<Employee>(query);
    return result.rows.length ? result.rows : [];
  }
  private createPasswordHash(password: string): Promise<string> {
    return argon2.hash(password);
  }
}


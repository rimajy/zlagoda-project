import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseInterceptors} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {RemoveSensitiveFieldsInterceptor} from "../../core/interceptors/remove-sensitive-fields.interceptor";
import {SortOrderPipe} from "../../core/pipes/sort-order.pipe";
import {AuthWithRole} from "../auth/decorators/auth-with-role.decorator";
import {EmployeeRole} from "../../core/entities/employee";
import {UpdateEmployeeDto} from "./dto/update-employee.dto";
import {Request} from "express";
import {SortOrder} from "../../core/types/sort-order";
import {Auth} from '../auth/decorators/auth.decorator';

@Controller('employee')
@UseInterceptors(RemoveSensitiveFieldsInterceptor)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  // @AuthWithRole([EmployeeRole.MANAGER])
  async createEmployee(@Body() body: CreateEmployeeDto) {
    return this.employeeService.createEmployee(body);
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER])
  async getEmployees(@Query('sort', new SortOrderPipe()) sort?: SortOrder,
                     @Query('surname') surname?: string) {
    return this.employeeService.getEmployeesSorted({surname, order: sort});
  }

  @Delete(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  async deleteEmployee(@Param('id') id: string, @Req() req: Request) {
    return this.employeeService.deleteEmployee(req.employee, id);
  }

  @Patch(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  async updateEmployee(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(id, body);
  }

  @Get('me')
  @Auth()
  async getMe(@Req() req: Request) {
    return this.employeeService.getEmployeeById(req.id_employee);
  }

  @Get('employee-with-no-high-discount-clients')
  @AuthWithRole([EmployeeRole.MANAGER])
  async getEmployeeThatHaventServedHighDiscountClients() {
    return this.employeeService.getEmployeeThatHaventServedHighDiscountClients();
  }
}

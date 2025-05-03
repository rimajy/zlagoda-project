import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { OptionalParseIntPipe } from '../../core/pipes/optional-parse-int.pipe'
import {CustomerCardService} from './customer-card.service';
import {CreateCustomerCardDto} from './dto/create-customer-card.dto';
import {UpdateCustomerCardDto} from './dto/update-customer-card.dto';
import {AuthWithRole} from "../auth/decorators/auth-with-role.decorator";
import {EmployeeRole} from "../../core/entities/employee";
import {SortOrderPipe} from "../../core/pipes/sort-order.pipe";
import {SortOrder} from "../../core/types/sort-order";

@Controller('customer-card')
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @Post()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.create(createCustomerCardDto);
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  findAll(
    @Query('sort', new SortOrderPipe()) sort?: SortOrder,
    @Query('surname') surname?: string,
    @Query('percent', new OptionalParseIntPipe()) percent?: number
  ) {
    return this.customerCardService.getCustomerCardSorted({sort, cust_surname: surname, percent});
  }

  @Get(":id")
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  getOne(@Param('id') id: string) {
    return this.customerCardService.getCustomerCardByCardNumber(id);
  }

  @Patch(':id')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  update(@Param('id') id: string, @Body() updateCustomerCardDto: UpdateCustomerCardDto) {
    return this.customerCardService.update(id, updateCustomerCardDto);
  }

  @Delete(':id')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  remove(@Param('id') id: string) {
    return this.customerCardService.remove(id);
  }
}

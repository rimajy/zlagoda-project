import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import { OptionalParseIntPipe } from '../../core/pipes/optional-parse-int.pipe'
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {AuthWithRole} from "../auth/decorators/auth-with-role.decorator";
import {EmployeeRole} from "../../core/entities/employee";
import {SortOrderPipe} from "../../core/pipes/sort-order.pipe";
import {SortOrder} from "../../core/types/sort-order";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @AuthWithRole([EmployeeRole.MANAGER])
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  findAll(
    @Query('sort', new SortOrderPipe()) sort?: SortOrder,
    @Query('category_number', new OptionalParseIntPipe()) category_number?: number,
    @Query('name') name?: string,
  ) {
    return this.productService.getProductsSorted({sort, category_number, name});
  }

  @Patch(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @AuthWithRole([EmployeeRole.MANAGER])
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.remove(id);
  }

  @Get('not-sold')
  @AuthWithRole([EmployeeRole.MANAGER])
  getNotSold() {
    return this.productService.getNotSoldProducts();
  }
}

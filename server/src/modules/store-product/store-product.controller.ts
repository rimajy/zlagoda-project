import {Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe} from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import {AuthWithRole} from "../auth/decorators/auth-with-role.decorator";
import {EmployeeRole} from "../../core/entities/employee";
import {SortOrderPipe} from "../../core/pipes/sort-order.pipe";
import {SortOrder} from "../../core/types/sort-order";

@Controller('store-product')
export class StoreProductController {
  constructor(private readonly storeProductService: StoreProductService) {}

  @Post()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  create(@Body() createStoreProductDto: CreateStoreProductDto) {
    return this.storeProductService.create(createStoreProductDto);
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  findAll(
    @Query('sortByAmount', new SortOrderPipe()) sortByAmount?: SortOrder,
    @Query('sortByName', new SortOrderPipe()) sortByName?: SortOrder,
    @Query('promotionalProduct', new ParseBoolPipe({optional: true})) promotionalProduct?: boolean,
    @Query('name') name?: string,
  ) {
    return this.storeProductService.queryStoreProduct({sortByAmount, sortByName, promotionalProduct, name});
  }

  @Get(":upc")
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  findOne(
    @Param('upc') upc: string
  ) {
    return this.storeProductService.getStoreProductByUpcWithProductInfo(upc);
  }

  @Patch(':upc')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  update(@Param('upc') upc: string, @Body() updateStoreProductDto: UpdateStoreProductDto) {
    return this.storeProductService.updateStoreProduct(upc, updateStoreProductDto);
  }


  @Delete(':upc')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  remove(@Param('upc') upc: string) {
    return this.storeProductService.deleteStoreProduct(upc);
  }
}

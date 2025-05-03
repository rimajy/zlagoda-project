import { Module } from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { StoreProductController } from './store-product.controller';
import {EmployeeModule} from "../employee/employee.module";
import {ProductModule} from "../product/product.module";

@Module({
  controllers: [StoreProductController],
  providers: [StoreProductService],
  imports: [EmployeeModule],
})
export class StoreProductModule {}

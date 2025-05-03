import {forwardRef, Module} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { EmployeeModule } from "../employee/employee.module";
import { CategoryModule } from "../category/category.module";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [EmployeeModule, forwardRef(() => CategoryModule)],
  exports: [ProductService]
})
export class ProductModule {}

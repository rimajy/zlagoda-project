import {Module} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {EmployeeModule} from "../employee/employee.module";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [EmployeeModule],
  exports: [CategoryService],
})
export class CategoryModule {}

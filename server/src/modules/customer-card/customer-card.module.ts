import { Module } from '@nestjs/common';
import { CustomerCardService } from './customer-card.service';
import { CustomerCardController } from './customer-card.controller';
import {EmployeeModule} from "../employee/employee.module";

@Module({
  controllers: [CustomerCardController],
  providers: [CustomerCardService],
  imports: [EmployeeModule],
  exports: [CustomerCardService],
})
export class CustomerCardModule {}

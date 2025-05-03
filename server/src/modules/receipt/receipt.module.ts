import { Module } from '@nestjs/common';
import { CustomerCardModule } from '../customer-card/customer-card.module'
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import {EmployeeModule} from '../employee/employee.module';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService],
  imports: [EmployeeModule, CustomerCardModule],
})
export class ReceiptModule {}

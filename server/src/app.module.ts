import {Module} from '@nestjs/common';
import {DatabaseModule} from './core/database/database.module';
import {ConfigModule} from "@nestjs/config";
import {EmployeeModule} from './modules/employee/employee.module';
import {AuthModule} from './modules/auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import { CustomerCardModule } from './modules/customer-card/customer-card.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { StoreProductModule } from './modules/store-product/store-product.module';
import { ReceiptModule } from './modules/receipt/receipt.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    EmployeeModule,
    AuthModule,
    JwtModule.register({
      global: true
    }),
    CustomerCardModule,
    CategoryModule,
    ProductModule,
    StoreProductModule,
    ReceiptModule,
  ],
})
export class AppModule {
}

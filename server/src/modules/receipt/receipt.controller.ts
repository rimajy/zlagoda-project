import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { ReceiptService } from './receipt.service'
import { CreateReceiptDto } from './dto/create-receipt.dto'
import { AuthWithRole } from '../auth/decorators/auth-with-role.decorator'
import { EmployeeRole } from '../../core/entities/employee'
import { Request } from 'express'
import { ParseDatePipe } from '@nestjs/common/pipes/parse-date.pipe'

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {
  }

  @Get()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async findAll(@Query('employee_id') employee_id: string,
                @Query('startDate', new ParseDatePipe({ optional: true })) startDate: Date,
                @Query('endDate', new ParseDatePipe({ optional: true })) endDate: Date,
  ) {
    return await this.receiptService.queryReceipts({
      employee_id,
      startDate,
      endDate,
    })
  }

  @Get('sum')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async findTotalReceiptSum(@Query('employee_id') employee_id: string,
                            @Query('startDate', new ParseDatePipe({ optional: true })) startDate: Date,
                            @Query('endDate', new ParseDatePipe({ optional: true })) endDate: Date,
  ) {
    return await this.receiptService.getReceiptsSum({
      employee_id,
      startDate,
      endDate,
    })
  }

  @Get('sold-products')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async findTotalSoldProductsCount(
    @Query('startDate', new ParseDatePipe({ optional: true })) startDate: Date,
    @Query('endDate', new ParseDatePipe({ optional: true })) endDate: Date,
    @Query('productId') productId: string,
  ) {
    if (!productId) {
      throw new BadRequestException('Product ID is required')
    }

    return await this.receiptService.getSoldProductsCount({
      startDate,
      endDate,
      productId,
    })
  }

  @Get('summary-by-categories')
  @AuthWithRole([EmployeeRole.MANAGER])
  async getSummaryByCategory() {
    return await this.receiptService.getSummaryByCategory()
  }

  @Get(':receipt_number')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async findReceipt(@Param('receipt_number') receipt_number: string) {
    return await this.receiptService.getReceiptById(receipt_number)
  }

  @Post()
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async create(@Body() createReceiptDto: CreateReceiptDto, @Req() req: Request) {
    return await this.receiptService.create(req.employee, createReceiptDto)
  }

  @Delete(':receipt_number')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async delete(@Param('receipt_number') receiptNumber: string) {
    return await this.receiptService.remove(receiptNumber)
  }

  @Get('me/last')
  @AuthWithRole([EmployeeRole.MANAGER, EmployeeRole.CASHIER])
  async findUserLastReceipt(@Req() req: Request) {
    return await this.receiptService.findUserLastReceipts(req.employee)
  }
}

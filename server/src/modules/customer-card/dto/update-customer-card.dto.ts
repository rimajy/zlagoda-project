import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerCardDto } from './create-customer-card.dto';

export class UpdateCustomerCardDto extends PartialType(CreateCustomerCardDto) {}

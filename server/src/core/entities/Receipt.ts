import { Employee } from './employee'
import { CustomerCard } from './customer-card'

export interface Receipt {
  receipt_number: string,
  id_employee: string,
  card_number: string | null,
  print_date: Date,
  sum_total: number,
  vat: number,

  items?: ReceiptItem[],
  employee?: Employee,
  customer: null | CustomerCard,
}

export interface ReceiptItem{
  upc: string,
  product_number: number;
  selling_price: number;
  product_name: string;
}
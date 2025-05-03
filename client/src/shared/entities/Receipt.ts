import { CustomerCard } from '@/shared/entities/customer-card'

export interface Receipt {
  receipt_number: string
  id_employee: string
  card_number: string | null
  print_date: Date
  sum_total: number
  vat: number

  items: ReceiptItem[],
  customer: null | CustomerCard,
  employee: {
    id_employee: string
    empl_surname: string
    empl_name: string
  }
}

export interface ReceiptItem {
  upc: string
  product_number: number
  selling_price: number
  product_name: string
}

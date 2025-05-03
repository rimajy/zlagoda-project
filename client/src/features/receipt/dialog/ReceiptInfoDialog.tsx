import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useReceiptModal } from '@/features/receipt/context/ReceiptModals.context'

export const ReceiptInfoDialog = () => {
  const { closeModal, modal, receipt } = useReceiptModal()

  return (
    <Dialog
      modal={false}
      open={modal === 'info'}
      onOpenChange={() => {
        window.history.pushState(null, '', '/dashboard/receipts')
        closeModal()
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Receipt Info</DialogTitle>
        </DialogHeader>
        <p>Receipt Id: <span className="text-gray-600">{receipt!.receipt_number}</span></p>
        <p>
          Employee:&nbsp;
          <span>{receipt!.employee.empl_surname} {receipt!.employee.empl_name}</span>&nbsp;
          (<span className="text-gray-600">{receipt!.employee.id_employee}</span>)
        </p>
        {receipt!.customer?.card_number ? (
          <p>
            Customer:&nbsp;
            <span>{receipt!.customer?.cust_surname} {receipt!.customer?.cust_name}</span>&nbsp;
            (<span className="text-gray-600">{receipt!.customer?.card_number}</span>)
          </p>
        ) : (
          <p>Customer: NULL</p>
        )}
        <p>
          Total Sum:&nbsp;
          <span className="font-bold">{receipt!.sum_total}</span>
        </p>
        <p>
          Vat:&nbsp;
          <span className="font-bold">{receipt!.vat}</span>
        </p>
        <div>
          <p>Items:</p>
          <div className="flex flex-col gap-2 mt-3">
            {receipt!.items.map((item) => (
              <div key={item.upc}
                   className="border-gray-200 border-2 rounded-lg p-4"
              >
                <p className="text-lg font-bold">{item.product_name} <span className="text-sm font-normal">#{item.upc}</span></p>
                <p>Amount: {item.product_number}</p>
                <p>Price: {item.selling_price}</p>
                <p>Sum: {item.product_number * item.selling_price}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

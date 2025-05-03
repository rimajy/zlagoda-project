'use client'

import { Button } from '@/components/ui/button'
import { useEmployeeRole } from '@/shared/hooks/useEmployeeRole'

interface PrintButtonProps {
  onClick: () => void
  disabled?: boolean
}

export const PrintButton = (props: PrintButtonProps) => {
  const role = useEmployeeRole()

  return role === "MANAGER" ? (
    <Button onClick={props.onClick} disabled={props.disabled}>
      Print
    </Button>
  ) : null
}
'use client'

import { useEmployeeRole } from '@/shared/hooks/useEmployeeRole'
import { cx } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavLinks = () => {
  const role = useEmployeeRole()

  return (
    <ul className="flex gap-2.5">
      <li>
        <NavLink href="/dashboard">Home</NavLink>
      </li>
      <li>
        <NavLink href="/dashboard/products">Products</NavLink>
      </li>
      {role === "MANAGER" ? (
        <li>
          <NavLink href="/dashboard/categories">Categories</NavLink>
        </li>
      ) : null}
      <li>
        <NavLink href="/dashboard/customers">Customers</NavLink>
      </li>
      <li>
        <NavLink href="/dashboard/store-products">Store Products</NavLink>
      </li>
      {role === "MANAGER" ? (
        <li>
          <NavLink href="/dashboard/employees">Employees</NavLink>
        </li>
      ) : null}
      <li>
        <NavLink href="/dashboard/receipts">Receipts</NavLink>
      </li>
    </ul>
  )
}

const NavLink = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  const pathname = usePathname()

  const classNames = cx({
    underline: pathname === href,
  })

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  )
}

import { PropsWithChildren } from 'react'

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-col relative items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900'>
      <div className='absolute top-[-80px] left-0 w-full opacity-50 z-[0] transform rotate-[-35deg] translate-[-35%]'>
        <p className='font-bold line animate-backgroundTextAnimation select-none text-[calc(1vh+40px)]/[80%] text-nowrap'>
          ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA
          ZLAGODA
        </p>
        <p className='font-bold animate-backgroundTextAnimationReverse select-none text-[calc(1vh+40px)]/[80%] text-nowrap'>
          ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA
          ZLAGODA
        </p>
        <p className='font-bold animate-backgroundTextAnimation select-none text-[calc(1vh+40px)]/[80%] text-nowrap'>
          ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA
          ZLAGODA
        </p>
        <p className='font-bold animate-backgroundTextAnimationReverse select-none text-[calc(1vh+40px)]/[80%] text-nowrap'>
          ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA
          ZLAGODA
        </p>
        <p className='font-bold animate-backgroundTextAnimation select-none text-[calc(1vh+40px)]/[80%] text-nowrap'>
          ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA
          ZLAGODA
        </p>
        <p className='font-bold animate-backgroundTextAnimationReverse select-none text-[calc(1vh+40px)]/[80%] text-nowrap'>
          ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA ZLAGODA
          ZLAGODA
        </p>
      </div>
      <main className='z-[1]'>{children}</main>
    </div>
  )
}

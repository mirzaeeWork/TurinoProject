import Link from 'next/link'
import { useState, useRef } from 'react'
import { FaRegUser } from 'react-icons/fa6'
import { TbUserFilled } from 'react-icons/tb'
import { toPersianDigits } from '@/utils/formatDate'
import { signOut, useSession } from 'next-auth/react'
import { IoIosArrowDown, IoMdLogOut } from 'react-icons/io'
import useOutsideClick from '@/hooks/useOutsideClick'
import { BiLogInCircle } from 'react-icons/bi'

export default function Auth ({ toggleAuth }) {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useOutsideClick([menuRef], () => {
    setIsMenuOpen(false)
  })

 if(status === "loading") return null

  return (
    <>
      {status === 'unauthenticated' ? (
        <>
          <button
            onClick={toggleAuth}
            className='green-link text-lg cursor-pointer font-medium w-[166px] h-[44px] hidden lg:flex items-center justify-center gap-2.5 border-2 rounded-lg'
          >
            <TbUserFilled className='w-[22px] h-[22px]' />
            <span>ورود | ثبت نام</span>
          </button>
          <button
            onClick={toggleAuth}
            className='green-link  cursor-pointer flex lg:hidden items-center justify-center  w-[40px] h-[40px]  border-1 rounded-[8px] '
          >
            <BiLogInCircle className='w-[24px] h-[24px]' />
          </button>
        </>
      ) : (
        <div className='relative' ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className='flex items-center cursor-pointer text-sm sm:text-lg font-medium text-(--color-link)'
          >
            <TbUserFilled className='text-[16px] sm:text-[22px]' />
            <span className='pt-1'>
              {toPersianDigits(session?.user?.mobile || '')}
            </span>
            <IoIosArrowDown className='mr-1' />
          </button>

          <ul
            className={`
              absolute left-[55%] sm:left-3/5 xl:left-1/2 -translate-x-1/2 z-50 w-[135px] sm:w-[180px] xl:w-[246px] rounded-[11px]
              bg-white shadow-md overflow-hidden flex-col
              transition-all duration-200 ease-out
              transform origin-top
              ${
                isMenuOpen
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-95 pointer-events-none'
              }
            `}
          >
            <li className='bg-[#F4F4F4] p-2 sm:py-2 sm:px-4 flex items-center gap-1.5'>
              <div className='bg-[#D9D9D9] w-[28px] h-[28px] rounded-full flex items-center justify-center'>
                <TbUserFilled className='text-[16px] text-[#696969]' />
              </div>
              <span className='text-sm sm:text-[16px] text-[#10411B] font-medium pt-1'>
                {toPersianDigits(session?.user?.mobile || '')}
              </span>
            </li>

            <li className='p-2 sm:px-4 sm:py-[11px]  cursor-pointer text-(--color-text) hover:bg-[#faf9f9]'>
              <Link
                href='/dashboard'
                onClick={() => setIsMenuOpen(false)}
                className='!text-[12px] sm:!text-[14px] flex items-center gap-1.5'
              >
                <FaRegUser className='text-[16px]' />
                <span>اطلاعات حساب کاربری</span>
              </Link>
            </li>

            <li className='mx-4 border-b border-(--color-border)'></li>

            <li
              className='p-2 sm:px-4 sm:py-[11px] flex items-center text-(--color-error) gap-1.5 cursor-pointer hover:bg-[#faf9f9]'
              onClick={() => {
                setIsMenuOpen(false)
                signOut()
              }}
            >
              <IoMdLogOut className='text-[16px]' />
              <span className='!text-[12px] sm:!text-[14px]'>خروج از حساب کاربری</span>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

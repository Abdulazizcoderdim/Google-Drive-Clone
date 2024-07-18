import { auth } from '@clerk/nextjs/server'
import { HelpCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import UserBox from './user-box'
import { Avatar, AvatarFallback } from '../ui/avatar'

const Navbar = () => {
  const { userId } = auth()
  return (
    <div className="h-[10vh] fixed left-0 top-0 right-0 z-30 bg-[#f6f9fC] dark:bg-[#1F1F1F]">
      <div className="flex items-center justify-between my-4 mx-6">
        <Link href={'/'}>
          <div className="flex items-center">
            <Image src={'/logo.svg'} alt="logo" width={40} height={40} />
            <span className="pl-2 text-[22px] opacity-75">Drive</span>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <div
            className="p-2 hover:bg-secondary rounded-full transition"
            role="button"
          >
            <HelpCircle className="w-5 h-5" />
          </div>
          <div
            className="p-2 hover:bg-secondary rounded-full transition"
            role="button"
          >
            <Settings className="w-5 h-5" />
          </div>
          {userId ? (
            <UserBox/>
          ) : (
             <Avatar className='cursor-pointer'>
              <AvatarFallback>AR</AvatarFallback>
             </Avatar>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

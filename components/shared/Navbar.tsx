import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const { userId } = auth()
  return (
    <div className="h-[10vh] fixed left-0 top-0 right-0 z-30 bg-[#f6f9fC]">
      <div className="flex items-center justify-between my-4 mx-6">
        <Link href={'/'}>
          <div className="flex items-center">
            <Image src={'/logo.svg'} alt="logo" width={40} height={40} />
            <span className="pl-2 text-[22px] opacity-75">Drive</span>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          
        </div>
      </div>
    </div>
  )
}

export default Navbar

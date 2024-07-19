import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import { ChildProps } from '@/types'

const AuthLayout = ({ children }: ChildProps) => {
  return (
    <div className="relative">
      <Navbar />
      <Sidebar />
      <main className="flex items-center justify-center w-full h-[90vh] relative">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout

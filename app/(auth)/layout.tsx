import Navbar from '@/components/shared/Navbar'
import { ChildProps } from '@/types'

const AuthLayout = ({ children }: ChildProps) => {
  return (
    <div className="relative">
      <Navbar />
      <div>Sidebar</div>
      <main className="flex items-center justify-center w-full h-[90vh] z-50 relative">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout

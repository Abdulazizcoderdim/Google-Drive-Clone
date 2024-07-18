import Navbar from '@/components/shared/Navbar'
import { ChildProps } from '@/types'

const AuthLayout = ({ children }: ChildProps) => {
  return (
    <div className="relative">
      <Navbar />
      <div>Sidebar</div>
      {children}
    </div>
  )
}

export default AuthLayout

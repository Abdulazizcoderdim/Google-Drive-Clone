import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  )
}

export default RootLayout

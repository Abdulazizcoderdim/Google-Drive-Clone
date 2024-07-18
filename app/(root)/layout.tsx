import Navbar from '@/components/shared/Navbar'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default RootLayout

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      {children}
      <p>footer</p>
    </div>
  )
}

export default RootLayout

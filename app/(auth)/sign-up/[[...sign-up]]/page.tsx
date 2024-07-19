'use client'

import { SignUp } from '@clerk/nextjs'
import { dark, experimental__simple } from '@clerk/themes'
import { useTheme } from 'next-themes'

export default function Page() {
  const { resolvedTheme } = useTheme()

  return (
    <SignUp
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : experimental__simple,
      }}
    />
  )
}

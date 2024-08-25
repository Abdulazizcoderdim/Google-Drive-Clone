import ModalProvider from '@/components/providers/modal-provider'
import SubscriptionProvider from '@/components/providers/subscription-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Google Drive Clone',
  description: 'Google Drive Clone',
  meta: '',
  openGraph: {
    title: 'Google Drive Clone',
    description: 'Google Drive Clone',
    url: 'https://google-drive-clone-19.vercel.app/',
    siteName: 'Google Drive Clone',
    images: [
      {
        url: 'logo.svg',
        width: 800,
        height: 600,
        alt: 'Google Drive Clone Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Drive Clone',
    description: 'Google Drive Clone',
    images: ['logo.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" content="Google Drive, Clone, Next.js, React" />
          <meta name="author" content="Abdulaziz" />
        </Head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="google-drive"
          >
            <Toaster position="top-center" />
            <ModalProvider />
            <SubscriptionProvider>{children}</SubscriptionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

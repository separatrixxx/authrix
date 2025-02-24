import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'authrix',
  description: 'authrix',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

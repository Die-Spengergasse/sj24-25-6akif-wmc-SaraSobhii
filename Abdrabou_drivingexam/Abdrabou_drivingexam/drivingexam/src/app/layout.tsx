import './globals.css'
import type { Metadata } from 'next'
import NavBar from '../app/components/NavBar' 


export const metadata: Metadata = {
  title: 'Driving License',
  description: 'Preparation for theoretical Driving Test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="bg-gray-900 text-white">
        <NavBar />
        <main className="p-6 max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  )
}

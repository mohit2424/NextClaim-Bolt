import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Footer } from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextClaim",
  description: "Unemployment Claims Management Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Sidebar />
        <main className="pl-16 min-h-[calc(100vh-4rem)] pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


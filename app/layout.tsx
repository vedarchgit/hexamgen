import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"

import QueryProvider from "@/components/query-provider";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })

export const metadata: Metadata = {
  title: "HexamGen - AI-Powered Learning Assistant",
  description: "Gamified academic scheduler and smart learning assistant",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistMono.variable} antialiased dark`}>
      <body className={`font-sans`}>
        <QueryProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}

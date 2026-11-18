import type { Metadata } from "next"
import { Geist_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TicTacToe",
  description: "Play TicTacToe — a React 19 + Next.js game with Tailwind CSS and shadcn/ui.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">{children}</body>
    </html>
  )
}

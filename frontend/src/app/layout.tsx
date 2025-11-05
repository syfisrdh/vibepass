import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";    

import { ThemeProvider } from "@/components/theme-providers"
import { ToastProvider } from "@/components/ui/toast-provider"
import { ResizableNavbar } from "@/components/ui/resizable-navbar"

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "VibePass",
  description: "Your ticket to unforgettable events and concerts make easy.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <ResizableNavbar />
            <main className="relative flex min-h-screen flex-col">
              {children}
            </main>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

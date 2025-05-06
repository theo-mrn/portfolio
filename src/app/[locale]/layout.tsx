import type React from "react"
import type { Metadata } from "next"
import '../globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { locales, type Locale } from '@/i18n/settings'
import { ThemeProvider } from "@/components/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { PreloadResources } from '@/components/PreloadResources'


const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: "Theo MORIN | Développeur Web",
  description: "Portfolio de Théo MORIN, développeur web spécialisé en React et Next.js",
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error)
    return {}
  }
}

export default async function LocaleLayout(props: Props) {
  const { locale } = await props.params

  // Enable static rendering
  await unstable_setRequestLocale(locale)

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    return null
  }

  const messages = await getMessages(locale)

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon/logo.png" />
      </head>
      <body className={`${inter.className}`} suppressHydrationWarning>
        <PreloadResources />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0} skipDelayDuration={0}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {props.children}
            </NextIntlClientProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
} 
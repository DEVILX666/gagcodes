import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grow a Garden Pet Codes 2025 - Free Roblox Pet Codes & Coupons',
  description: 'Get free Grow a Garden pet codes for 2025! Unlock Kitsune, Queen Bee, T-Rex, Dragonfly pets and more. Daily updated working codes for Roblox Grow a Garden.',
  keywords: 'grow a garden pet codes, roblox pet codes, free pet codes, kitsune pet code, queen bee pet code, t-rex pet code, dragonfly pet code, roblox grow a garden, pet codes 2025, working pet codes',
  authors: [{ name: 'Grow a Garden Pet Codes' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://growagardenpetcodes.com/',
    title: 'Grow a Garden Pet Codes 2025 - Free Roblox Pet Codes & Coupons',
    description: 'Get free Grow a Garden pet codes for 2025! Unlock Kitsune, Queen Bee, T-Rex, Dragonfly pets and more. Daily updated working codes for Roblox Grow a Garden.',
    images: ['/images/logo2.webp'],
    siteName: 'Grow a Garden Pet Codes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grow a Garden Pet Codes 2025 - Free Roblox Pet Codes & Coupons',
    description: 'Get free Grow a Garden pet codes for 2025! Unlock Kitsune, Queen Bee, T-Rex, Dragonfly pets and more. Daily updated working codes for Roblox Grow a Garden.',
    images: ['/images/logo2.webp'],
  },
  alternates: {
    canonical: 'https://growagardenpetcodes.com/',
  },
  other: {
    'theme-color': '#10b981',
    'msapplication-TileColor': '#10b981',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" type="image/webp" href="/images/favicon.jpg" />
        <link rel="apple-touch-icon" href="/images/favicon.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Grow a Garden Pet Codes",
              "url": "https://growagardenpetcodes.com/",
              "description": "Free Grow a Garden pet codes for Roblox. Get working codes for Kitsune, Queen Bee, T-Rex, Dragonfly pets and more.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://growagardenpetcodes.com/?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 
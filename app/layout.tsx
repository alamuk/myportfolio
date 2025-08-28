import type React from "react"
import type { Metadata } from "next"
import { Manrope, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-manrope",
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jetbrains-mono",
})


export const metadata: Metadata = {
    title: "Charlie Cash - Personal Portfolio",
    description: "SF based. NY raised. British born. Speak fluent social.",
    generator: "v0.dev",
}

export default function RootLayout({ children,}: Readonly <{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`${manrope.variable} ${jetbrainsMono.variable} antialiased`}
        >
        <body className="font-sans">{children}</body>
        </html>
    )
}


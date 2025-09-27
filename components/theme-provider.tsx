"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-500/[0.02] via-blue-600/[0.02] to-cyan-500/[0.02]">
        {children}
      </div>
    </NextThemesProvider>
  )
}

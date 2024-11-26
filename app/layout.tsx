import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { caveat } from "./fonts";
import { Providers } from "@/components/providers";
export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Play tic tac toe with a friend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${caveat.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⭕</text></svg>"
        />
      </head>
      <body suppressHydrationWarning className={`antialiased`}>
        <ThemeProvider attribute={"class"} defaultTheme="dark" disableTransitionOnChange>
          <Providers />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

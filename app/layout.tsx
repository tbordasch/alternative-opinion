import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeScript from "./theme-script";

export const metadata: Metadata = {
  title: "The Opinions",
  description: "Space for encouraging thoughtful dialogue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light h-full">
      <body className="h-full">
        <ThemeScript />
        <ThemeProvider>
          <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}


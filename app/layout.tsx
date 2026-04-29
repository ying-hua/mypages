import type { Metadata } from "next";
import { Fraunces, Lora, Caveat } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astro — AI应用工程师",
  description: "Astro的个人网站，北京大学研三在读，准AI应用软件工程师。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${fraunces.variable} ${lora.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

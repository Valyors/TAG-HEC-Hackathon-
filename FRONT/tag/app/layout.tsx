"use client";
import Nav from "@/components/nav";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <Nav />
        </Provider>
      </body>
    </html>
  );
}

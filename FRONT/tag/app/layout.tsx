"use client";
import Nav from "@/components/nav";
import "./globals.css";
import { Inter } from "next/font/google";
import PeopleProvider from "@/components/people-provider"
import Provider from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Pokedex" />
      </head>
      <body className={inter.className}>
            {children}
            <Nav/>
        <Provider>
        <PeopleProvider>

          {children}
          <Nav />
        </PeopleProvider>

        </Provider>
      </body>
    </html>
  );
}

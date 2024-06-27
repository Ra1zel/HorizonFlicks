import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/app/_config/site";
import { lato } from "@/app/_config/fonts";
import { Navbar } from "@/app/_components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={`${lato.className}`} lang='en'>
      <head />
      <body
        className={clsx(
          "bg-background font-sans overflow-y-visible antialiased",
          lato.className,
        )}
        id='main-container'
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className='relative flex flex-col'>
            <Navbar />
            <main className='w-full flex-grow'>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

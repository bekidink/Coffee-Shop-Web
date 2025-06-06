import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/utils/Providers";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Coffee Online Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <NextSSRPlugin
          
          routerConfig={extractRouterConfig(ourFileRouter)}
        /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}

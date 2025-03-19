import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import Header from "@/Header";

export const metadata: Metadata = {
  title: "Sparta LolInfo",
  description: "리그 오브 레전드 정보 제공 웹 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <Header />
        <ClientProvider>
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}

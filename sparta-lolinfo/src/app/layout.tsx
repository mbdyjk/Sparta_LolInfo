import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-center">
            <div className="flex justify-between w-full">
              <Link
                href="/"
                className="flex font-bold justify-center flex-1 hover:text-gray-300"
              >
                홈
              </Link>
              <Link
                href="/champions"
                className="flex font-bold justify-center flex-1 hover:text-gray-300"
              >
                챔피언 목록
              </Link>
              <Link
                href="/items"
                className="flex font-bold justify-center flex-1 hover:text-gray-300"
              >
                아이템 목록
              </Link>
              <Link
                href="/rotation"
                className="flex font-bold justify-center flex-1 hover:text-gray-300"
              >
                챔피언 로테이션
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

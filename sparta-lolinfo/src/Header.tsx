"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      document.documentElement.classList.toggle("dark", !prev);
      return !prev;
    });
  };

  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-center items-center">
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
        <button
          onClick={toggleDarkMode}
          className="ml-4 p-2 bg-gray-700 dark:bg-gray-600 rounded w-40"
        >
          {isDarkMode ? "라이트 모드" : "다크 모드"}
        </button>
      </nav>
    </header>
  );
}

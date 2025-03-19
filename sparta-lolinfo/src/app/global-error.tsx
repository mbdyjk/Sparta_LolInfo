"use client";

import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <html>
      <body className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">예상치 못한 오류 발생</h1>
        <p className="text-red-500 mb-4">{error.message}</p>
        <button
          onClick={() => {
            reset();
            router.push("/");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          홈으로 돌아가기
        </button>
      </body>
    </html>
  );
}

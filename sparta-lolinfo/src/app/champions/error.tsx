"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function ChampionsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      reset();
      router.refresh();
    });
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">챔피언 목록 로드 실패</h2>
      <p className="text-red-500 mb-4">{error.message}</p>
      <button
        onClick={handleRetry}
        disabled={isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isPending ? "재시도 중..." : "재시도"}
      </button>
    </div>
  );
}

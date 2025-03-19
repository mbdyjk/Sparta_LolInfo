// CSR 방식 - tanstack query 사용하기
"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Champion } from "@/types/Champion";
import { DDRAGON_BASE_URL } from "@/constants/config";
import { getLatestVersion } from "@/utils/serverApi";

async function fetchRotationChampions(): Promise<Champion[]> {
  const resRotation = await fetch("/api/rotation", { cache: "no-store" });
  console.log(resRotation);
  if (!resRotation.ok) {
    const errorData = await resRotation.json();
    throw new Error(
      errorData.error || "로테이션 데이터를 가져오지 못했습니다."
    );
  }
  const rotation = await resRotation.json();

  const version = await getLatestVersion();

  const resChampions = await fetch(
    `${DDRAGON_BASE_URL}/cdn/${version}/data/ko_KR/champion.json`,
    { cache: "force-cache" }
  );
  if (!resChampions.ok) {
    throw new Error("챔피언 데이터를 가져오지 못했습니다.");
  }
  const championData = await resChampions.json();
  const allChampions: Champion[] = Object.values(championData.data);

  return allChampions.filter((champion) =>
    rotation.freeChampionIds.includes(Number(champion.key))
  );
}

export default function RotationPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["rotation"],
    queryFn: fetchRotationChampions,
  });

  if (isLoading) return <div className="text-center p-4">로딩 중...</div>;
  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 에러";
    return (
      <div className="text-center p-4 text-red-500">
        에러 발생: {errorMessage}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">무료 챔피언 로테이션</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.map((champion) => (
          <Link href={`/champions/${champion.id}`} key={champion.id}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <Image
                src={`${DDRAGON_BASE_URL}/cdn/15.5.1/img/champion/${champion.image.full}`}
                alt={champion.name}
                width={100}
                height={100}
                className="mx-auto"
              />
              <h2 className="text-center mt-2 font-semibold">
                {champion.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

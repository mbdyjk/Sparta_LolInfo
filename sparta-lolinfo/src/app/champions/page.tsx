import { Champion } from "@/types/Champion";
import { ChampionCard } from "@/components/ChampionCard";
import { fetchChampionList } from "@/utils/serverApi";
import { Suspense } from "react";
import { getLatestVersion } from "@/utils/serverApi";
import { CHAMPIONS_PAGE_REVALIDATE } from "@/constants/config";

export const revalidate = CHAMPIONS_PAGE_REVALIDATE;

export default async function ChampionsPage() {
  let champions: Champion[];
  let version: string;
  try {
    champions = await fetchChampionList();
    version = await getLatestVersion();
  } catch (error) {
    champions = [];
    console.error("챔피언 데이터를 불러오는 데 실패했습니다:", error);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">챔피언 목록</h1>
      <Suspense fallback={<div className="text-center">로딩 중...</div>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {champions.map((champion) => (
            <ChampionCard
              key={champion.id}
              champion={champion}
              version={version}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}

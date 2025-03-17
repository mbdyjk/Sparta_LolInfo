import { Champion } from "@/types/Champion";
import { ChampionRotation } from "@/types/ChampionRotation";
import { DDRAGON_BASE_URL } from "@/constants/config";
import { getLatestVersion } from "./serverApi";

// 챔피언 로테이션 데이터 가져오기
export async function getChampionRotation(): Promise<Champion[]> {
  // 1. 로테이션 데이터 가져오기
  const resRotation = await fetch("/api/rotation", {
    cache: "no-store",
  });
  if (!resRotation.ok) {
    throw new Error("로테이션 데이터를 가져오지 못했습니다.");
  }
  const rotation: ChampionRotation = await resRotation.json();

  const version = await getLatestVersion();
  // 2. 모든 챔피언 데이터 가져오기
  const resChampions = await fetch(
    `${DDRAGON_BASE_URL}/cdn/${version}/data/ko_KR/champion.json`,
    { cache: "force-cache" }
  );
  if (!resChampions.ok) {
    throw new Error("챔피언 데이터를 가져오지 못했습니다.");
  }
  const championData = await resChampions.json();
  const allChampions: Champion[] = Object.values(championData.data);

  // 3. 무료 챔피언 필터링
  return allChampions.filter((champion) =>
    rotation.freeChampionIds.includes(Number(champion.key))
  );
}

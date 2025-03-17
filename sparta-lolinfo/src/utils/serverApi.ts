"use server";

import { Champion, ChampionDetail } from "@/types/Champion";
import { Item } from "@/types/Item";
import { DDRAGON_BASE_URL } from "@/constants/config";
import { REVALIDATE_CACHE_TIME } from "@/constants/config";

let cachedVersion: string | null = null;

// 최신 버전 가져오기 -> 버전이 자주 바뀌지는 않으므로 캐싱 데이터를 사용하는 최적화 필요
export async function getLatestVersion(): Promise<string> {
  if (cachedVersion != null) {
    return cachedVersion;
  }
  const res = await fetch(`${DDRAGON_BASE_URL}/api/versions.json`, {
    cache: "force-cache",
    next: { revalidate: REVALIDATE_CACHE_TIME },
  }); // Next.js 캐시에서 버전을 가져오고, 업데이트 주기를 하루로 지정
  if (!res.ok) throw new Error("버전 정보를 가져오지 못했습니다.");
  const versions = (await res.json()) as string[]; // API 응답 string[] 고정
  cachedVersion = versions[0];
  return cachedVersion;
}

// 챔피언 목록 가져오기
export async function fetchChampionList(): Promise<Champion[]> {
  const version = await getLatestVersion();
  const res = await fetch(
    `${DDRAGON_BASE_URL}/cdn/${version}/data/ko_KR/champion.json`
  );
  if (!res.ok) throw new Error("챔피언 목록을 가져오지 못했습니다.");
  const data = await res.json();
  return Object.values(data.data);
}

// 챔피언 상세 정보 가져오기
export async function fetchChampionDetail(id: string): Promise<ChampionDetail> {
  const version = await getLatestVersion();
  const res = await fetch(
    `${DDRAGON_BASE_URL}/cdn/${version}/data/ko_KR/champion/${id}.json`
  );
  if (!res.ok) throw new Error("챔피언 상세 정보를 가져오지 못했습니다.");
  const data = await res.json();
  return Object.values(data.data)[0] as ChampionDetail;
}

// 아이템 목록 가져오기
export async function fetchItemList(): Promise<Item[]> {
  const version = await getLatestVersion();
  const res = await fetch(
    `${DDRAGON_BASE_URL}/cdn/${version}/data/ko_KR/item.json`
  );
  if (!res.ok) throw new Error("아이템 목록을 가져오지 못했습니다.");
  const data = await res.json();
  return Object.entries(data.data).map(([id, item]) => ({
    id: Number(id),
    ...(item as Omit<Item, "id">), // id 속성을 제외한 나머지 타입
  }));
}

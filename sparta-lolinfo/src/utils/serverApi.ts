"use server";

import { Champion, ChampionDetail } from "@/types/Champion";
import { DDRAGON_BASE_URL } from "@/constants/config";

// 최신 버전 가져오기 -> 버전이 자주 바뀌지는 않으므로 캐싱 데이터를 사용하는 최적화 필요
async function getLatestVersion(): Promise<string> {
  const res = await fetch(`${DDRAGON_BASE_URL}/api/versions.json`);
  if (!res.ok) throw new Error("버전 정보를 가져오지 못했습니다.");
  const versions = await res.json();
  return versions[0];
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

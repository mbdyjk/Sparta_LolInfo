import { NextResponse } from "next/server";
import { ChampionRotation } from "@/types/ChampionRotation";

// 로테이션 데이터 GET 요청
export async function GET() {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API 키 에러" }, { status: 500 });
  }

  const res = await fetch(
    "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
    {
      headers: {
        "X-Riot-Token": apiKey,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "로테이션 데이터를 가져오지 못했습니다." },
      { status: 500 }
    );
  }

  const data: ChampionRotation = await res.json();
  return NextResponse.json(data);
}

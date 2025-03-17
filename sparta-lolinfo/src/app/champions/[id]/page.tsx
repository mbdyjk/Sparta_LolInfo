// SSR 방식
import { fetchChampionDetail } from "@/utils/serverApi";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const champion = await fetchChampionDetail(params.id);
  return {
    title: `${champion.name} - ${champion.title}`,
    description: champion.blurb.slice(0, 150) + "...", // 검색 엔진이 구글 기준 155~160 자로 잘라서 표시
  };
}

export default async function ChampionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const champion = await fetchChampionDetail(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{champion.name}</h1>
      <p className="text-xl text-gray-600 mb-4">{champion.title}</p>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/${champion.image.full}`}
        alt={champion.name}
        width={200}
        height={200}
        className="mb-4"
      />
      <p className="text-lg mb-6">{champion.blurb}</p>
      <h2 className="text-2xl font-semibold mb-2">스킬</h2>
      <div className="grid gap-4">
        {champion.spells.map((spell) => (
          <div key={spell.id} className="border p-4 rounded-lg">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.5.1/img/spell/${spell.image.full}`}
              alt={spell.name}
              width={50}
              height={50}
            />
            <h3 className="text-lg font-medium">{spell.name}</h3>
            <p>{spell.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Champion } from "@/types/Champion";
import { DDRAGON_BASE_URL } from "@/constants/config";

interface ChampionCardProps {
  champion: Champion;
  version: string;
}

export function ChampionCard({ champion, version }: ChampionCardProps) {
  return (
    <Link href={`/champions/${champion.id}`} key={champion.id}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <Image
          src={`${DDRAGON_BASE_URL}/cdn/${version}/img/champion/${champion.image.full}`}
          alt={champion.name}
          width={100}
          height={100}
          className="mx-auto"
          loading="lazy"
        />
        <h2 className="text-center mt-2 font-semibold">{champion.name}</h2>
        <p className="text-center text-gray-600">{champion.title}</p>
      </div>
    </Link>
  );
}

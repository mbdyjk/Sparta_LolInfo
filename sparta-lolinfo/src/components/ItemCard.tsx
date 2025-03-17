import Image from "next/image";
import { DDRAGON_BASE_URL } from "@/constants/config";
import { Item } from "@/types/Item";

interface ItemCardProps {
  item: Item;
  version: string;
}

export function ItemCard({ item, version }: ItemCardProps) {
  return (
    <div
      key={item.id}
      className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
    >
      <Image
        src={`${DDRAGON_BASE_URL}/cdn/${version}/img/item/${item.image.full}`}
        alt={item.name}
        width={100}
        height={100}
        className="mx-auto"
      />
      <h2 className="text-center mt-2 font-semibold">{item.name}</h2>
    </div>
  );
}

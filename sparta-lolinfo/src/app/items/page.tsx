import { fetchItemList, getLatestVersion } from "@/utils/serverApi";
import Image from "next/image";
import { DDRAGON_BASE_URL } from "@/constants/config";
import { Item } from "@/types/Item";

export default async function ItemsPage() {
  let items: Item[];
  let version: string;
  try {
    items = await fetchItemList();
    version = await getLatestVersion();
  } catch (error) {
    items = [];
    console.error("아이템 데이터를 불러오는 데 실패했습니다:", error);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">아이템 목록</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
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
        ))}
      </div>
    </div>
  );
}

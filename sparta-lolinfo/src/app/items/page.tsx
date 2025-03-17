import { fetchItemList, getLatestVersion } from "@/utils/serverApi";
import { Item } from "@/types/Item";
import { ItemCard } from "@/components/ItemCard";

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
          <ItemCard key={item.id} item={item} version={version} />
        ))}
      </div>
    </div>
  );
}

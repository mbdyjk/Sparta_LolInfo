export interface Item {
  id: number;
  name: string;
  description: string;
  gold: {
    base: number;
    total: number;
    sell: number;
  };
  image: {
    full: string;
  };
}

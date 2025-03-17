export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

export interface ChampionDetail extends Champion {
  blurb: string;
  info: {
    attack: string;
    defense: string;
    magic: string;
    difficulty: string;
  };
  spells: {
    id: string;
    name: string;
    description: string;
    image: {
      full: string;
    };
  }[];
}

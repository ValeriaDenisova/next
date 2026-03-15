export interface CategoriesApi {
  id: number;
  title: string;
  image?: {
    url: string;
  };
}

export interface Categories {
  id: number;
  title: string;
  image?: string;
}

export const normalizeCategories = (from: CategoriesApi[]): Categories[] => {
  return from.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image?.url,
  }));
};

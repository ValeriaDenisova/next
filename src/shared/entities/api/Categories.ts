export interface CategoriesApi {
  id: number;
  title: string;
}

export interface Categories {
  id: number;
  title: string;
}

export const normalizeCategories = (from: CategoriesApi[]): Categories[] => {
  return from.map((item) => ({
    id: item.id,
    title: item.title,
  }));
};

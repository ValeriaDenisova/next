export interface FavoritesApi {
  recipe: {
    id: string;
    documentId: string;
    name: string;
    summary: string;
    calories: number;
    images: {
      url: string;
    }[];
  };
}

export interface Favorites {
  id: string;
  documentId: string;
  name: string;
  summary: string;
  calories: number;
  images: string;
}

export const normalizeFavorites = (from: FavoritesApi[]): Favorites[] => {
  return from.map((item) => ({
    id: item.recipe.id,
    documentId: item.recipe.documentId,
    name: item.recipe.name,
    summary: item.recipe.summary,
    calories: item.recipe.calories,
    images: item.recipe.images[0].url,
  }));
};

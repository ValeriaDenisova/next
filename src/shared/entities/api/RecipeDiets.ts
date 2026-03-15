export interface RecipeDietsApi {
  id: number | string;
  title: string;
  image: string;
}

export interface RecipeDiets {
  id: number | string;
  title: string;
  image: string;
}

export const normalizeRecipeDiets = (from: RecipeDietsApi[]): RecipeDiets[] => {
  return from.map((item) => ({
    id: item.id,
    image: item.image,
    title: item.title,
  }));
};

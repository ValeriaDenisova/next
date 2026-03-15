export interface RecipeParams {
  sort?: string;
  pagination?: {
    withCount?: boolean;
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  populate?: string | string[];
  filters?: {
    category: {
      id: {
        $eq: (number | string)[];
      };
    };
    name: {
      $containsi: string;
    };
  };
  locale?: string;
}

export interface RecipeApi {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  calories: number;
  images: {
    url: string;
  }[];
}

export interface Recipe {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  calories: number;
  images: string;
}

export const normalizeRecipe = (from: RecipeApi[]): Recipe[] => {
  return from.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    name: item.name,
    summary: item.summary,
    calories: item.calories,
    images: item.images[0].url,
  }));
};

export interface RecipeInfoParams {
  populate: string | string[];
}

export interface RecipeInfoApi {
  id: number;
  cookingTime: number;
  preparationTime: number;
  totalTime: number;
  likes: number;
  servings: number;
  rating: number;
  summary: string;
  name: string;
  images: {
    url: string;
  }[];

  ingradients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  }[];

  equipments: {
    id: number;
    name: string;
  }[];

  directions: {
    id: number;
    description: string;
  }[];
}

export interface RecipeInfo {
  id: number;
  cookingTime: number;
  preparationTime: number;
  totalTime: number;
  likes: number;
  servings: number;
  rating: number;
  summary: string;
  images: string;
  name: string;
  ingradients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  }[];

  equipments: {
    id: number;
    name: string;
  }[];

  directions: {
    id: number;
    description: string;
  }[];
}

export const normalizeRecipeInfo = (from: RecipeInfoApi): RecipeInfo => {
  return {
    id: from.id,
    cookingTime: from.cookingTime,
    preparationTime: from.preparationTime,
    totalTime: from.totalTime,
    likes: from.likes,
    servings: from.servings,
    rating: from.rating,
    summary: from.summary,
    images: from.images[0].url,
    ingradients: from.ingradients,
    equipments: from.equipments,
    directions: from.directions,
    name: from.name,
  };
};

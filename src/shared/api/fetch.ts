import { API_BASE_URL } from "@config/apiConfig";
import { stringify } from "qs";

export async function fetchRecipes(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryIds?: (string | number)[];
}) {
  const query = stringify({
    pagination: { page: params.page ?? 1, pageSize: params.pageSize ?? 9 },
    populate: "images",
    filters: {
      category: { id: { $eq: params.categoryIds ?? [] } },
      name: { $containsi: params.search ?? "" },
    },
  });

  const res = await fetch(`${API_BASE_URL}/recipes?${query}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Recipes fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchCategories() {
  const query = stringify({
    populate: "image",
  });
  const res = await fetch(`${API_BASE_URL}/meal-categories?${query}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchRecipeById(id: string) {
  const query = stringify({
    populate: ["images", "ingradients", "equipments", "directions"],
  });

  const res = await fetch(`${API_BASE_URL}/recipes/${id}?${query}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function fetchRecipesCategory(params: { categoryIds?: string | number | undefined }) {
  const query = stringify({
    populate: "images",
    filters: {
      category: { id: { $eq: params.categoryIds ?? [] } },
    },
  });

  const res = await fetch(`${API_BASE_URL}/recipes?${query}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Recipes fetch failed: ${res.status}`);
  return res.json();
}

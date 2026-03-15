import type { Metadata } from "next";
import { fetchRecipes, fetchCategories } from "@api/fetch";
import { normalizeRecipe } from "@entities/api/Recipe";
import { normalizeCategories } from "@entities/api/Categories";
import Main from "@components/pages/Main";

export const metadata: Metadata = {
  title: "Meal Planning Recipes - a collection of dishes for every day",
  description:
    "Discover a wide range of recipes: quick and easy dishes, step-by-step instructions, and serving tips. Find ideas for breakfast, lunch, and dinner",
};

export default async function Home() {
  const [recipesRes, categoriesRes] = await Promise.all([
    fetchRecipes({ page: 1, pageSize: 9 }),
    fetchCategories(),
  ]);

  const recipes = normalizeRecipe(recipesRes.data);
  const total = recipesRes.meta?.pagination?.total ?? 0;
  const categories = normalizeCategories(categoriesRes.data);

  return (
    <>
      <Main initialRecipes={recipes} initialTotal={total} initialCategories={categories} />
    </>
  );
}

/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import { fetchRecipes, fetchCategories } from "@api/fetch";
import { normalizeRecipe } from "@entities/api/Recipe";
import { normalizeCategories } from "@entities/api/Categories";
import Main from "@components/pages/Main";

export const metadata: Metadata = {
  title: "Рецепты — сборник блюд на каждый день",
  description:
    "Откройте для себя широкий ассортимент рецептов: быстрые и простые блюда, пошаговые инструкции и советы по подаче. Найдите идеи для завтраков, обеда и ужина",
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

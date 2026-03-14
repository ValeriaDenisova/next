import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryRecipe from "@/shared/components/pages/CategoryRecipe";
import { normalizeRecipe } from "@/shared/entities/api/Recipe";
import { fetchRecipesСategory } from "@api/fetch";

type Props = { params: Promise<{ id: string }> };

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const parts = id.split("_").filter((p) => p);
  const recipeId = parts[0] ?? "";
  const rawTitle = parts[1] ?? "";
  const title = rawTitle.replace(/-/g, " ");
  const json = await await fetchRecipesСategory({ categoryIds: recipeId });
  if (!json) return { title: "Рецепт не найден" };

  return {
    title: title,
    description: `Category: ${title}. Selection of recipes for every day: quick-cooking dishes, step-by-step instructions and tips.`,
  };
}

export default async function CategoryRecipePage({ params }: Props) {
  const { id } = await params;
  const parts = id.split("_").filter((p) => p);
  const recipeId = parts[0] ?? "";
  const rawTitle = parts[1] ?? "";
  const title = rawTitle.replace(/-/g, " ");

  const json = await fetchRecipesСategory({ categoryIds: recipeId });
  if (!json) notFound();

  const recipes = normalizeRecipe(json.data);

  return <CategoryRecipe recipes={recipes} title={title} />;
}

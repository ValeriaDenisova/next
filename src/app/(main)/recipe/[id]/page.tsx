import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchRecipeById } from "@/shared/api/fetch";
import { normalizeRecipeInfo } from "@entities/api/RecipeInfo";
import Recipe from "@components/pages/Recipe";

type Props = { params: Promise<{ id: string }> };

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const json = await fetchRecipeById(id);
  if (!json) return { title: "Рецепт не найден" };

  const recipe = json.data;
  return {
    title: recipe.name,
    description: recipe.summary?.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      title: recipe.name,
      images: recipe.images?.[0]?.url ? [{ url: recipe.images[0].url }] : [],
    },
  };
}

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const json = await fetchRecipeById(id);

  if (!json) notFound();

  const recipeInfo = normalizeRecipeInfo(json.data);

  return <Recipe id={id} initialData={recipeInfo} />;
}

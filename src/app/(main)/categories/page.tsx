/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import { fetchCategories } from "@api/fetch";
import { normalizeCategories } from "@entities/api/Categories";
import Categories from "@/shared/components/pages/Categories";

export const metadata: Metadata = {
  title: "Recipes — Categories of dishes for every day",
  description:
    "Discover a wide range of recipes categorized as: Quick and easy meals, step-by-step instructions and serving tips. Find ideas for breakfast, lunch and dinner.",
};

export default async function CategoriesPage() {
  const categoriesRes = await fetchCategories();
  const categories = categoriesRes ? normalizeCategories(categoriesRes.data) : [];
  return <Categories initialCategories={categories} />;
}

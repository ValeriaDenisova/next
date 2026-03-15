import type { Metadata } from "next";
import Diets from "@components/pages/Diets";

export const metadata: Metadata = {
  title: "Recipes — Diets",
  description:
    "An overview of recipes for different diets. Quick and healthy meals, tips on meal planning, and sample menus.",
};

export default async function DietsPage() {
  return <Diets />;
}

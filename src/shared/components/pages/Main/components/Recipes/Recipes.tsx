"use client";
import { useRef } from "react";
import { useRecipeStore, useCategoriesStore } from "@store/hooks/globalStores";
import Subtitle from "../Subtitle";
import Filter from "../Filter";
import Products from "../Products";
import { Recipe } from "@entities/api/Recipe";
import { Categories } from "@entities/api/Categories";
import s from "./Recipes.module.scss";

interface RecipesProps {
  initialRecipes: Recipe[];
  initialTotal: number;
  initialCategories: Categories[];
}

const Recipes: React.FC<RecipesProps> = ({ initialRecipes, initialTotal, initialCategories }) => {
  const recipeStore = useRecipeStore();
  const categoriesStore = useCategoriesStore();
  const hydrated = useRef(false);

  if (!hydrated.current) {
    recipeStore.hydrate(initialRecipes, initialTotal);
    categoriesStore.hydrate(initialCategories);
    hydrated.current = true;
  }

  return (
    <div className={s.recipes}>
      <Subtitle text="Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts." />
      <Filter />
      <Products />
    </div>
  );
};

export default Recipes;

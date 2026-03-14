"use client";
import { useRef } from "react";
import { useRecipeStore, useCategoriesStore } from "@store/hooks/globalStores";
import Subtitle from "../Subtitle";
import Filter from "../Filter";
import Products from "../Products";
import { Recipe } from "@entities/api/Recipe";
import { Categories } from "@entities/api/Categories";
import RecipeDay from "../RecipeDay";
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

  // eslint-disable-next-line
  if (!hydrated.current) {
    recipeStore.hydrate(initialRecipes, initialTotal);
    categoriesStore.hydrate(initialCategories);
    hydrated.current = true;
  }

  return (
    <div className={s.recipes}>
      <Subtitle
        text={
          <span>
            Find the perfect food and <u>drink ideas</u> for every occasion, from{" "}
            <u>weeknight dinners</u> to <u>holiday feasts.</u>
          </span>
        }
      />
      <Filter />
      <RecipeDay total={initialTotal} />
      <Products />
    </div>
  );
};

export default Recipes;

import React from "react";
import MainHeader from "./components/MainHeader";
import Recipes from "./components/Recipes";
import { Recipe } from "@entities/api/Recipe";
import { Categories } from "@entities/api/Categories";
import s from "./Main.module.scss";

interface MainProps {
  initialRecipes: Recipe[];
  initialTotal: number;
  initialCategories: Categories[];
}

const Main: React.FC<MainProps> = ({ initialRecipes, initialTotal, initialCategories }) => {
  return (
    <>
      <MainHeader />
      <div className="wrapper">
        <div className={s.main}>
          <Recipes
            initialRecipes={initialRecipes}
            initialTotal={initialTotal}
            initialCategories={initialCategories}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(Main);

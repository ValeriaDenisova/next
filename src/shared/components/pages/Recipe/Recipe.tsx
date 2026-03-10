"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import parse from "html-react-parser";
import RecipeHeader from "./components/RecipeHeader";
import RecipesInfo from "./components/RecipesInfo";
import RecipeDescription from "./components/RecipeDescription";
import IngredientsEquipment from "./components/IngredientsEquipment";
import Directions from "./components/Directions";
import Loader from "@components/Loader";
import RecipeInfoStore from "@store/locals/RecipeInfoStore";
import { useLocalStore } from "@store/hooks/useLocalStore";
import type { RecipeInfo } from "@entities/api/RecipeInfo";
import s from "./Recipe.module.scss";

interface RecipeProps {
  id: string;
  initialData: RecipeInfo;
}
const Recipe: React.FC<RecipeProps> = observer(({ id, initialData }) => {
  const info = useLocalStore(() => new RecipeInfoStore(id));

  useEffect(() => {
    info.hydrate(initialData);
    return () => {
      if (typeof info.destroy === "function") info.destroy();
    };
  }, []);

  return (
    <div className="wrapper">
      {info.cleanLoading && (
        <div className={s.loader}>
          <Loader className={s.loader__svg} />
        </div>
      )}
      {!info.cleanLoading && (
        <div className={s.recipe}>
          <RecipeHeader name={initialData.name} loading={info.cleanLoading} info={info} id={id} />
          <div className={s.recipe__content}>
            {info.cleanRecipeInfo && (
              <RecipesInfo
                cookingTime={info.cleanRecipeInfo.cookingTime}
                preparationTime={info.cleanRecipeInfo.preparationTime}
                totalTime={info.cleanRecipeInfo.totalTime}
                likes={info.cleanRecipeInfo.likes}
                serving={info.cleanRecipeInfo.servings}
                rating={info.cleanRecipeInfo.rating}
                img={info.cleanRecipeInfo.images}
              />
            )}
            <RecipeDescription text={parse(initialData.summary)} />
            {info.cleanRecipeInfo && (
              <IngredientsEquipment
                ingradients={info.cleanRecipeInfo.ingradients}
                equipments={info.cleanRecipeInfo.equipments}
              />
            )}
            <Directions directions={initialData.directions} />
          </div>
        </div>
      )}
    </div>
  );
});

export default Recipe;

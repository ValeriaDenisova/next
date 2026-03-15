import React from "react";
import Image from "next/image";
import RecipeInfoElement from "./components/RecipeInfoElement";
import s from "./RecipesInfo.module.scss";

interface RecipesInfoProps {
  cookingTime: number;
  preparationTime: number;
  totalTime: number;
  likes: number;
  serving: number;
  rating: number;
  img: string;
}

const RecipesInfo: React.FC<RecipesInfoProps> = ({
  cookingTime,
  preparationTime,
  totalTime,
  likes,
  serving,
  rating,
  img,
}) => {
  return (
    <div className={s.recipeInfo}>
      <div className={s.recipeInfo__img}>
        <Image
          className={s.img}
          src={img}
          alt=""
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className={s.info__container}>
        <div className={s.info}>
          <RecipeInfoElement title={"Preparation"} info={`${preparationTime} minutes`} />
          <RecipeInfoElement title={"Cooking"} info={`${cookingTime} minutes`} />
          <RecipeInfoElement title={"Total"} info={`${totalTime} minutes`} />
          <RecipeInfoElement title={"Likes"} info={`${likes}`} />
          <RecipeInfoElement title={"Servings"} info={`${serving} servings`} />
          <RecipeInfoElement title={"Ratings"} info={`${rating}`} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(RecipesInfo);

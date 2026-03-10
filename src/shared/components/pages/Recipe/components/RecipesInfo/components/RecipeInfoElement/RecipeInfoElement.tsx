import React from "react";
import Text from "@components/Text";
import s from "./RecipeInfoElement.module.scss";

interface RecipeInfoElementProps {
  title: string;
  info: string;
}

const RecipeInfoElement: React.FC<RecipeInfoElementProps> = ({ title, info }) => {
  return (
    <div className={s.recipeInfoElement}>
      <Text className={s.title}>{title}</Text>
      <Text className={s.info}>{info}</Text>
    </div>
  );
};

export default React.memo(RecipeInfoElement);

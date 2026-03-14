import React from "react";
import Text from "@/shared/components/Text";
import s from "./CategoriesTitle.module.scss";

interface CategoriesTitleProps {
  title: string;
}

const CategoriesTitle: React.FC<CategoriesTitleProps> = ({ title }) => {
  return <Text className={s.categoriesTitle}>{title}</Text>;
};

export default React.memo(CategoriesTitle);

import React from 'react';
import s from './RecipeDescription.module.scss';

interface RecipeDescriptionProps {
  text: React.ReactNode;
}

const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ text }) => {
  return <div className={s.recipeDescription}>{text}</div>;
};

export default React.memo(RecipeDescription);

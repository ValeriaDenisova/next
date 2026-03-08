import React from 'react';
import Image from 'next/image';
import RecipeInfoElement from './components/RecipeInfoElement';
import s from './RecipeInfo.module.scss';

interface RecipeInfoProps {
  cookingTime: number;
  preparationTime: number;
  totalTime: number;
  likes: number;
  serving: number;
  rating: number;
  img: string;
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({
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
        <Image className={s.img} src={img} alt="" width={448} height={248}/>
      </div>
      <div className={s.info__container}>
        <div className={s.info}>
          <RecipeInfoElement title={'Preparation'} info={`${preparationTime} minutes`} />
          <RecipeInfoElement title={'Cooking'} info={`${cookingTime} minutes`} />
          <RecipeInfoElement title={'Total'} info={`${totalTime} minutes`} />
          <RecipeInfoElement title={'Likes'} info={`${likes}`} />
          <RecipeInfoElement title={'Servings'} info={`${serving} servings`} />
          <RecipeInfoElement title={'Ratings'} info={`${rating}`} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(RecipeInfo);

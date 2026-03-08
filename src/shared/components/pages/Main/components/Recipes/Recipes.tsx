import React from 'react';
import Subtitle from '../Subtitle';
import Filter from '../Filter';
import Products from '../Products';
import s from './Recipes.module.scss';

const Recipes: React.FC = () => {
  return (
    <div className={s.recipes}>
      <Subtitle
        text={
          'Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts.'
        }
      />
      <Filter />
      <Products />
    </div>
  );
};

export default React.memo(Recipes);

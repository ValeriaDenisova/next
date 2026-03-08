import React from 'react';
import MainHeader from './components/MainHeader';
import Recipes from './components/Recipes';
import s from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <>
      <MainHeader />
      <div className="wrapper">
        <div className={s.main}>
          <Recipes />
        </div>
      </div>
    </>
  );
};

export default React.memo(Main);

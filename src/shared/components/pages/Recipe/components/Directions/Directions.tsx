import React from 'react';
import Step from './components/Step';
import TextTitle from '@components/TextTitle';
import s from './Directions.module.scss';

interface DirectionsProps {
  directions: {
    id: number;
    description: string;
  }[];
}

const Directions: React.FC<DirectionsProps> = ({ directions }) => {
  return (
    <div className={s.directions}>
      <TextTitle text={'Directions'} />
      <div className={s.stenContant}>
        {directions?.map((direction, index) => (
          <Step key={direction.id} number={`${index}`} text={direction.description} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Directions);

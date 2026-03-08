import React from 'react';
import s from './IngredientsEquipmentSeparator.module.scss';

const IngredientsEquipmentSeparator: React.FC = () => {
  return (
    <div className={s.separatop}>
      <div className={s.circle}></div>
      <div className={s.line}></div>
    </div>
  );
};

export default React.memo(IngredientsEquipmentSeparator);

import React from 'react';
import TextTitle from '@components/TextTitle';
import s from './IngredientsEquipmentContainer.module.scss';

interface IngredientsEquipmentContainerProps {
  title: string;
  arrayElement: React.ReactNode[];
  width?: string;
}

const IngredientsEquipmentContainer: React.FC<IngredientsEquipmentContainerProps> = ({
  title,
  arrayElement,
  width,
}) => {
  return (
    <div className={s.ingredientsContainer} style={{ width: width ? width : undefined }}>
      <TextTitle text={title} />
      <div className={s.content}>
        {arrayElement.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default React.memo(IngredientsEquipmentContainer);

import React from 'react';
import Image from 'next/image';
import IngredientsEquipmentContainer from './components/IngredientsEquipmentContainer';
import IngredientsEquipmentElement from './components/IngredientsEquipmentContainer/components/IngredientsEquipmenElement';
import IngredientsEquipmentSeparator from './components/IngredientsEquipmentSeparator';
import ingredientsSvg from '@components/icons/ingredients.svg';
import equipmentSvg from '@components/icons/equipment.svg';
import s from './IngredientsEquipment.module.scss';

interface IngredientsEquipmentProps {
  ingradients: {
    id: number;
    name: string;
    amount: number;
  }[];

  equipments: {
    id: number;
    name: string;
  }[];
}

const IngredientsEquipment: React.FC<IngredientsEquipmentProps> = ({ ingradients, equipments }) => {
  return (
    <div className={s.ingredientsContainer}>
      <IngredientsEquipmentContainer
        title={'Ingredients'}
        width={'calc(50% - 3.5px)'}
        arrayElement={[
          ingradients?.map((ingradient) => (
            <IngredientsEquipmentElement
              key={ingradient.id}
              svg={<Image src={ingredientsSvg} alt="" width={24} height={24}/>}
              text={`${ingradient.amount} ${ingradient.name}`}
            />
          )),
        ]}
      />
      <IngredientsEquipmentSeparator />
      <IngredientsEquipmentContainer
        title={'Equipment'}
        width={'calc(50% - 3.5px)'}
        arrayElement={[
          equipments?.map((equipment) => (
            <IngredientsEquipmentElement
              key={equipment.id}
              svg={<Image src={equipmentSvg} alt="" width={24} height={24} />}
              text={equipment.name}
            />
          )),
        ]}
      />
    </div>
  );
};

export default React.memo(IngredientsEquipment);

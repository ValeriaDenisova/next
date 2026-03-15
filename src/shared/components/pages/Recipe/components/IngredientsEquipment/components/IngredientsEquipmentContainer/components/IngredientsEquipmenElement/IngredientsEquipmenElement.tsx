import React from "react";
import Text from "@components/Text";
import s from "./IngredientsEquipmenElement.module.scss";

interface IngredientsEquipmentElementProps {
  svg: React.ReactNode;
  text: string;
}

const IngredientsEquipmentElement: React.FC<IngredientsEquipmentElementProps> = ({ svg, text }) => {
  return (
    <div className={s.ingredientsEquipmentElement}>
      {svg}
      <Text>{text}</Text>
    </div>
  );
};

export default React.memo(IngredientsEquipmentElement);

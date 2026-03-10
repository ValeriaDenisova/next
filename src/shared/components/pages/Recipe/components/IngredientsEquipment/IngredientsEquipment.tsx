import React from "react";
import IngredientsEquipmentContainer from "./components/IngredientsEquipmentContainer";
import IngredientsEquipmentElement from "./components/IngredientsEquipmentContainer/components/IngredientsEquipmenElement";
import IngredientsEquipmentSeparator from "./components/IngredientsEquipmentSeparator";
import Equipment from "@components/icons/Equipment";
import Ingredients from "@components/icons/Ingredients";
import s from "./IngredientsEquipment.module.scss";

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
        title={"Ingredients"}
        width={"calc(50% - 3.5px)"}
        arrayElement={[
          ingradients?.map((ingradient) => (
            <IngredientsEquipmentElement
              key={ingradient.id}
              text={`${ingradient.amount} ${ingradient.name}`}
              svg={
                <Ingredients
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  color="secondary"
                />
              }
            />
          )),
        ]}
      />
      <IngredientsEquipmentSeparator />
      <IngredientsEquipmentContainer
        title={"Equipment"}
        width={"calc(50% - 3.5px)"}
        arrayElement={[
          equipments?.map((equipment) => (
            <IngredientsEquipmentElement
              key={equipment.id}
              svg={
                <Equipment
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  color="secondary"
                />
              }
              text={equipment.name}
            />
          )),
        ]}
      />
    </div>
  );
};

export default React.memo(IngredientsEquipment);

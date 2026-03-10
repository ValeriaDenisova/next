import React from "react";
import Image from "next/image";
import mainImage from "@public/main.png";
import recipes from "@components/icons/Recipes.svg";
import s from "./MainHeader.module.scss";

const MainHeader: React.FC = () => {
  return (
    <>
      <div className={s.mainHeader}>
        <Image
          className={s.mainHeader__img}
          src={mainImage}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw"
          style={{ objectFit: "cover" }}
        />
        <div className={s.title}>
          <Image className={s.title__svg} src={recipes} alt="" width={313} height={185} />
        </div>
      </div>
    </>
  );
};

export default React.memo(MainHeader);

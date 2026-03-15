import React from "react";
import Image from "next/image";
import mainImage from "@public/main.png";
import Text from "@/shared/components/Text";
import s from "./MainHeader.module.scss";

interface MainHeaderProps {
  title: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ title }) => {
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
          priority
        />
        <div className={s.title}>
          <Text className={s.text}>{title}</Text>
        </div>
      </div>
    </>
  );
};

export default React.memo(MainHeader);

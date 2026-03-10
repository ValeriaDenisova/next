import React from "react";
import Text from "@components/Text";
import s from "./Subtitle.module.scss";

interface SubtitleProps {
  text: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  return <Text className={s.subtitle}>{text}</Text>;
};

export default React.memo(Subtitle);

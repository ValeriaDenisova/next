import * as React from 'react';
import Text from '../Text/Text';
import s from './TextTitle.module.scss';

export type TextTitleProps = {
  text: string;
};

const TextTitle: React.FC<TextTitleProps> = ({ text }) => {
  return <Text className={s.title}>{text}</Text>;
};

export default React.memo(TextTitle);

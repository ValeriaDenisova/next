import React from 'react';
import Text from '@components/Text';
import s from './Step.module.scss';

interface StepProps {
  number: string;
  text: string;
}

const Step: React.FC<StepProps> = ({ number, text }) => {
  return (
    <>
      <Text className={s.title}>Step {number}</Text>
      <Text className={s.text}>{text}</Text>
    </>
  );
};

export default React.memo(Step);

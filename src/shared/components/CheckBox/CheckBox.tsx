import React, { useCallback } from 'react';
import CheckIcon from '../Icons/CheckIcon';
import s from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, disabled, ...restProps }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange]
  );

  return (
    <label className={`${s.container}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={s.checkbox}
        {...restProps}
        style={{ opacity: 0 }}
      />
      <span
        className={`${s.customCheckmark} ${disabled ? s.disabledSpan : ''} ${!disabled ? s.hover : ''}`}
      >
        {checked && !disabled && (
          <CheckIcon color="accent" width={40} height={40} className={s.notDisabled} />
        )}
        {checked && disabled && (
          <CheckIcon color="primary" width={40} height={40} className={s.disabled} />
        )}
      </span>
    </label>
  );
};

export default React.memo(CheckBox);

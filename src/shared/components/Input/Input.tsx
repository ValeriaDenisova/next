import React from "react";
import s from "./Input.module.scss";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value?: string;
  onChange: (value: string) => void;
  onChangeKey?: (value: string) => void;
  afterSlot?: React.ReactNode;
  placeholder?: string;
  width?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, onChangeKey, afterSlot, className, placeholder, width, ...rest }, ref) => {
    return (
      <div
        className={`${s.container} ${rest.disabled ? s.container__disabled : ""} ${className}`}
        style={{ width }}
      >
        <input
          ref={ref}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (e.target.value.length === 0 && onChangeKey !== undefined) {
              onChangeKey(e.target.value);
            }
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && onChangeKey !== undefined) {
              const input = e.target as HTMLInputElement;
              onChangeKey(input.value);
            }
          }}
          className={`${s.input} ${s.container__input}`}
          type="text"
          placeholder={placeholder}
          {...rest}
        />
        {afterSlot && <div className={s.slot}>{afterSlot}</div>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default React.memo(Input);

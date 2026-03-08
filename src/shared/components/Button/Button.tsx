import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader';
import s from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  search?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  children,
  disabled,
  search,
  ...rest
}) => {
  const buttonClass =
    loading && !disabled
      ? classNames(s.button, className)
      : classNames(s.button, s.button__disabled, s.button__hover, className);

  const isDisabled = disabled || loading;

  return (
    <button
      className={buttonClass}
      disabled={isDisabled}
      style={{
        paddingTop: loading || search ? '14px' : undefined,
        paddingBottom: loading || search ? '14px' : undefined,
      }}
      {...rest}
    >
      {loading && <Loader size="s" color="#ffffff" />}
      {children}
    </button>
  );
};

export default React.memo(Button);

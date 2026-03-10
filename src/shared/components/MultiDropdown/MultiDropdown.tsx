"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Input from "../Input";
import s from "./MultiDropdown.module.scss";

export type Option = {
  key: string | number;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
  afterSlot?: React.ReactNode;
  isOpenCategory: boolean;
  onOpenCategory: (value: boolean) => void;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  afterSlot,
  isOpenCategory,
  onOpenCategory,
  ...props
}) => {
  const toggleDropdown = useCallback(
    (value: boolean) => {
      if (disabled) {
        onOpenCategory(false);
      }
      onOpenCategory(value);
    },
    [disabled, onOpenCategory],
  );

  const [selected, setSelected] = useState<Option[]>(value);
  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  const handleClickOption = useCallback(
    (key: string | number) => {
      const selectedOption = options.find((option) => option.key === key);
      if (!selectedOption) return;

      setSelected((prev) => {
        const isSelected = prev.some((option) => option.key === key);
        let newSelected;

        if (isSelected) {
          newSelected = prev.filter((option) => option.key !== key);
        } else {
          newSelected = [...prev, selectedOption];
        }
        return newSelected;
      });
    },
    [options],
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const plaseholder: string = getTitle([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        toggleDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [filterText, setFilterText] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const handleChange = useCallback(
    (value: string) => {
      setFilterText(value);
    },
    [setFilterText],
  );

  const filteredOptions =
    filterText.trim() === ""
      ? options
      : options.filter((option) => option.value.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div className={`${className} ${s.multiDropdown}`} ref={containerRef}>
      <Input
        value={isInputFocused || selected.length === 0 ? "" : getTitle(selected)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => {
          setIsInputFocused(false);
          setFilterText("");
        }}
        onChange={handleChange}
        onClick={() => toggleDropdown(true)}
        placeholder={plaseholder}
        disabled={disabled}
        afterSlot={afterSlot}
        readOnly
        {...props}
      />
      {!disabled && isOpenCategory && (
        <div className={s.options}>
          {filteredOptions.map((option) => (
            <p
              key={option.key}
              className={`${s.options__element} 
            ${selected.some((selectedOption) => selectedOption.key === option.key) ? s.option__active : ""}`}
              onClick={() => handleClickOption(option.key)}
            >
              {option.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);

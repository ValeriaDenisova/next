"use client";
import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import Button from "@components/Button";
import Input from "@components/Input";
import MultiDropdown from "@components/MultiDropdown";
import { useCategoriesStore, useRecipeStore } from "@store/hooks/globalStores";
import type { Option } from "@components/MultiDropdown/MultiDropdown";
import { handleTitle } from "@utils/utils";
import { Categories } from "@entities/api/Categories";
import Clear from "@components/icons/Clear";
import Search from "@components/icons/Search";
import s from "./Filter.module.scss";
import Slot from "@/shared/components/icons/Slot";
import Text from "@/shared/components/Text";

const Filter: React.FC = observer(() => {
  const resipes = useRecipeStore();
  const categories = useCategoriesStore();
  const [tempSearch, setTempSearch] = React.useState<string>("");

  const [categoriesFilter, setCategoriesFilter] = React.useState<Option[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [checkFilter, setCheckFilter] = useState<boolean>(false);
  const [searchCheck, setSearchCheck] = useState<boolean>(true);
  const [veg, setVeg] = useState<boolean>(false);

  const isFirstVegRender = useRef(true);

  setTimeout(() => {
    setSearchCheck(false);
  }, 500);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const categoriesJSON = params.get("category");
      const searchRaw = params.get("search");

      if (categoriesJSON) {
        try {
          const categoriesFromUrl = JSON.parse(decodeURIComponent(categoriesJSON));
          setCategoriesFilter(categoriesFromUrl);
          setCheckFilter(true);
        } catch (e) {
          console.error("Ошибка при разборе категорий из URL", e);
        }
      } else {
        setCheckFilter(true);
      }

      if (searchRaw) {
        try {
          setTempSearch(decodeURIComponent(searchRaw));
        } catch (e) {
          console.error("Ошибка при разборе search из URL", e);
        }
      }

      const vegetarianParam = params.get("vegetarian");
      if (vegetarianParam !== null) {
        setVeg(vegetarianParam === "true");
      }
    }
  }, []);

  useEffect(() => {
    if (isFirstVegRender.current) {
      isFirstVegRender.current = false;
      return;
    }
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (veg) {
        params.set("vegetarian", "true");
      } else {
        params.delete("vegetarian");
      }
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }, [veg]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (categoriesFilter.length > 0) {
        const jsonString = encodeURIComponent(JSON.stringify(categoriesFilter));
        params.set("category", jsonString);
      } else if (checkFilter) {
        params.delete("category");
      }
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }, [categoriesFilter, checkFilter]);

  useEffect(() => {
    resipes.setFiltersCategory(categoriesFilter);
  }, [categoriesFilter]);

  useEffect(() => {
    resipes.setVegetarian(veg);
  }, [veg]);

  useEffect(() => {
    if (searchCheck) {
      resipes.setSearch(tempSearch);
    }
  }, [tempSearch]);

  return (
    <div className={s.filter}>
      <div className={s.search}>
        <div className={s.input}>
          <Input
            value={tempSearch}
            onChange={setTempSearch}
            placeholder={"Enter dishes"}
            width={"100%"}
            onChangeKey={(value) => {
              resipes.setSearch(value);
            }}
            afterSlot={
              <Clear
                width="24px"
                height="24px"
                viewBox="0 0 16 16"
                version="1.1"
                fill="none"
                color="primary"
                stroke="#afadb5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                className="cursor"
                onClick={() => {
                  setTempSearch("");
                  resipes.setSearch("");
                }}
              />
            }
          />
        </div>
        <Button
          search={true}
          onClick={() => {
            resipes.setSearch(tempSearch);
          }}
        >
          <Search width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor" />
        </Button>
      </div>
      <div className={s.category}>
        <div onClick={() => setVeg((v) => !v)} className={s.category__vegetarian}>
          <Text className={`${s.vegetarian} cursor ${veg ? s.active : ""}`}>Vegetarian</Text>
        </div>
        <MultiDropdown
          onChange={setCategoriesFilter}
          getTitle={handleTitle}
          options={categories.cleanCategories.map((item: Categories) => {
            return { key: item.id, value: item.title };
          })}
          value={categoriesFilter}
          afterSlot={
            <div className={s.categoriesFilter__slot}>
              <Clear
                width="24px"
                height="24px"
                viewBox="0 0 16 16"
                version="1.1"
                fill="none"
                color="primary"
                stroke="#afadb5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cursor"
                strokeWidth="1.5"
                onClick={() => {
                  setCategoriesFilter([]);
                }}
              />
              <Slot
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="cursor"
                fill="none"
                color="primary"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>
          }
          isOpenCategory={isOpen}
          onOpenCategory={setIsOpen}
        />
      </div>
    </div>
  );
});

export default Filter;

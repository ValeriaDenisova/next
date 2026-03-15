"use client";
import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Text from "../../Text";
import { useRecipeDietsStore } from "@store/hooks/globalStores";
import { DIETS, NATIONAL_CUISINES } from "@/shared/constants/constants";
import s from "./NationalCuisines.module.scss";
import MainHeader from "../../MainHeader";
import Loader from "../../Loader";

const NationalCuisines: React.FC = () => {
  const recipes = useRecipeDietsStore();
  const [active, setActive] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const handleClick = useCallback(
    (d: string) => {
      setActive((prev) => (prev === d ? "" : d));
      setSubCategories([]);
    },
    [active],
  );

  const handleSubClick = useCallback((ns: string) => {
    setSubCategories((prev) => (prev.includes(ns) ? prev.filter((s) => s !== ns) : [...prev, ns]));
  }, []);

  useEffect(() => {
    const dietsParam = active ? [active] : [];
    if (dietsParam.length > 0) {
      recipes.fetchRecipes(subCategories, dietsParam);
    }
  }, [active, subCategories, recipes]);

  const recipeCategory = recipes.getRecipes;

  return (
    <>
      <MainHeader title="National Cuisines" />
      <div className="wrapper">
        <Text className={s.title}>Сhoose the national cuisine you need</Text>
        <div className={s.cuisines__container}>
          {NATIONAL_CUISINES.map((nc) => (
            <div key={nc}>
              <div onClick={() => handleClick(nc)}>
                <Text className={`${s.cuisines__name} ${active === nc ? s.active : ""} cursor`}>
                  {nc}
                </Text>
              </div>

              {active === nc && (
                <>
                  <div className={s.container}>
                    {DIETS.map((d) => (
                      <div key={`${nc}-${d}`} className={s.diets} onClick={() => handleSubClick(d)}>
                        <Text
                          className={`${s.diets__name} ${subCategories.includes(d) ? s.active : ""} cursor`}
                        >
                          {d}
                        </Text>
                      </div>
                    ))}
                  </div>
                  <div className={s.recipe}>
                    {recipeCategory.map((rc) => {
                      return (
                        <div key={rc.id} className={s.recipe__title}>
                          <Image src={rc.image} alt="" width={200} height={100} />
                          <Text className={s.recipe__text}>{rc.title}</Text>
                        </div>
                      );
                    })}
                    {recipeCategory.length === 0 && !recipes.getLoading && (
                      <Text className={s.categoryNull}>There are no recipes in this category</Text>
                    )}
                    {recipes.getLoading && (
                      <div className={s.loader}>
                        <Loader className={s.loader__svg} />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NationalCuisines;

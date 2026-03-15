"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import Text from "../../Text";
import { DIETS, NATIONAL_CUISINES } from "@constants/constants";
import { useRecipeDietsStore } from "@store/hooks/globalStores";
import MainHeader from "../../MainHeader";
import s from "./Diets.module.scss";
import Loader from "../../Loader";

const Diets: React.FC = observer(() => {
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
      recipes.fetchRecipes(dietsParam, subCategories);
    }
  }, [active, subCategories, recipes]);

  const recipeCategory = recipes.getRecipes;

  return (
    <>
      <MainHeader title="Diets" />
      <div className="wrapper">
        <Text className={s.title}>Choose the diet you need</Text>
        <div className={s.diets__container}>
          {DIETS.map((d) => (
            <div key={d}>
              <div onClick={() => handleClick(d)}>
                <Text className={`${s.diets__name} ${active === d ? s.active : ""} cursor`}>
                  {d}
                </Text>
              </div>
              {active === d && (
                <>
                  <div className={s.container}>
                    {NATIONAL_CUISINES.map((nc) => (
                      <div
                        key={`${d}-${nc}`}
                        className={s.cuisines}
                        onClick={() => handleSubClick(nc)}
                      >
                        <Text
                          className={`${s.cuisines__name} ${subCategories.includes(nc) ? s.active : ""} cursor`}
                        >
                          {nc}
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
});

export default Diets;

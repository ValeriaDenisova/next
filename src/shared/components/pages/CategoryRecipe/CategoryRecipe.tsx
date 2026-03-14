"use client";
import React from "react";
import Link from "next/link";
import parse from "html-react-parser";
import Card from "@components/Card";
import { Recipe } from "@entities/api/Recipe";
import Text from "../../Text";
import MainHeader from "../../MainHeader";
import Button from "../../Button";
import s from "./CategoryRecipe.module.scss";

interface CategoryRecipeProps {
  recipes: Recipe[];
  title: string;
}

const CategoryRecipe: React.FC<CategoryRecipeProps> = ({ recipes, title }) => {
  return (
    <>
      <MainHeader title={title} />
      <div className={`wrapper`}>
        {recipes.length > 0 && (
          <div className={s.category}>
            {recipes?.map((item: Recipe, index: number) => {
              const cleanedSummary = item.summary
                .replace(/<a[^>]*>(.*?)<\/a>/g, "<span>$1</span>")
                .replace(/<p[^>]*>(.*?)<\/p>/g, "<div>$1</div>");
              return (
                <Link
                  key={index}
                  href={`/recipe/${item.documentId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    image={item.images}
                    title={item.name}
                    subtitle={parse(cleanedSummary)}
                    contentSlot={<p className={s.slot}>{item.calories} kcal</p>}
                  />
                </Link>
              );
            })}
          </div>
        )}
        {recipes.length === 0 && (
          <Text className={s.notRecipes}>There are no recipes in this category.</Text>
        )}
        <div className={s.linkCategories}>
          <Link href="/categories" style={{ textDecoration: "none" }}>
            <Button>Go back to categories</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default React.memo(CategoryRecipe);

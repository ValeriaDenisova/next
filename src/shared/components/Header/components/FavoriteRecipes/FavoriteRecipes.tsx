"use client";
import React from "react";
import { observer } from "mobx-react-lite";
import parse from "html-react-parser";
import Link from "next/link";
import Card from "@components/Card";
import Text from "@components/Text";
import Loader from "@components/Loader";
import { useUserStore, useFavoritesStore } from "@store/hooks/globalStores";
import s from "./FavoriteRecipes.module.scss";

interface FavoriteRecipesProps {
  onFavoriteClose: () => void;
}

const FavoriteRecipes: React.FC<FavoriteRecipesProps> = observer(({ onFavoriteClose }) => {
  const user = useUserStore();
  const favorites = useFavoritesStore();

  return (
    <>
      {favorites.cleanLoading && (
        <div className={s.loader}>
          <Loader className={s.loader__svg} />
        </div>
      )}
      {!favorites.cleanLoading && !user.hasToken && (
        <div className={s.favorite__text}>
          <Text>Log in to your account</Text>
        </div>
      )}

      {!favorites.cleanLoading && user.hasToken && (
        <div className={s.favoriteRecipes}>
          {favorites.cleanRecipes.map((item) => {
            const cleanedSummary = item.summary
              .replace(/<a[^>]*>(.*?)<\/a>/g, "<span>$1</span>")
              .replace(/<p[^>]*>(.*?)<\/p>/g, "<div>$1</div>");

            return (
              <Link
                key={item.documentId}
                href={`/recipe/${item.documentId}`}
                style={{ textDecoration: "none" }}
                onClick={onFavoriteClose}
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

      {favorites.cleanRecipes.length === 0 && user.hasToken && (
        <Text className={s.notLike}>Your favorite recipes will be displayed here.</Text>
      )}
    </>
  );
});

export default FavoriteRecipes;

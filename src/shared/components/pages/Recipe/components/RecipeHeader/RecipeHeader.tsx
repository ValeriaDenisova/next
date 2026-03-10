"use client";
import React from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import Text from "@components/Text";
import Button from "@components/Button";
import { useFavoritesStore, useUserStore } from "@store/hooks/globalStores";
import RecipeInfoStore from "@store/locals/RecipeInfoStore";
import { ParamValue } from "next/dist/server/request/params";
import s from "./RecipeHeader.module.scss";
import Back from "@components/icons/Back";

interface RecipeHeaderProps {
  loading: boolean;
  info: RecipeInfoStore;
  id: ParamValue;
  name: string;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = observer(({ loading, info, id, name }) => {
  const user = useUserStore();
  const favorites = useFavoritesStore();
  return (
    <div className={s.resipeHeader}>
      <div className={s.resipeHeader__left}>
        <Link href={`/`} style={{ textDecoration: "none" }}>
          <div className={s.back}>
            <Back width="32" height="32" viewBox="0 0 32 32" fill="none" color="secondary" />
          </div>
        </Link>
        <Text className={s.title}>{name}</Text>
      </div>
      {!loading && user.hasToken && !info.isFavorite && (
        <Button
          className={s.resipeHeader__button}
          onClick={() => {
            favorites.fetchAdd(id);
          }}
        >
          Add to Favorites
        </Button>
      )}
      {!loading && user.hasToken && info.isFavorite && (
        <Button
          className={s.resipeHeader__button}
          onClick={() => {
            favorites.fetchDelete(id);
          }}
        >
          Delete to Favorites
        </Button>
      )}
    </div>
  );
});

export default RecipeHeader;

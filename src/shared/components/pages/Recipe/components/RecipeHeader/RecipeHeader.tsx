'use client'
import React from 'react';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import Text from '@components/Text';
import array from '@components/icons/recipe_header.svg';
import Button from '@components/Button';
import { useFavoritesStore, useUserStore } from '@store/hooks/globalStores';
import RecipeInfoStore from '@store/locals/RecipeInfoStore';
import { ParamValue } from 'next/dist/server/request/params';
import s from './RecipeHeader.module.scss';

interface RecipeHeaderProps {
  loading: boolean;
  info: RecipeInfoStore;
  id?: ParamValue;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = observer(({ loading, info , id}) => {

  const user = useUserStore();
  const favorites = useFavoritesStore();
  return (
    <div className={s.resipeHeader}>
      <div className={s.resipeHeader__left}>
        <Link href={`/`} style={{ textDecoration: 'none' }}>
            <div className={s.back}>
              <Image src={array} alt="" width={32} height={32}/>
            </div>
        </Link>
        <Text className={s.title}>{info.cleanRecipeInfo?.name}</Text>
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

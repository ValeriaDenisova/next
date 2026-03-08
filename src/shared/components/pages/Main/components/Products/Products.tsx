'use client'
import React, { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import parse from 'html-react-parser';
import Card from '@components/Card';
import Text from '@components/Text';
import Loader from '@components/Loader';
import arrayTop from '@public/icons/arrayTop.svg';
import { useRecipeStore } from '@store/hooks/globalStores';
import ScrollStore from '@store/locals/ScrollStore';
import { smoothScrollTo } from '@utils/utils';
import s from './Products.module.scss';
import { Recipe } from '@entities/api/Recipe';

const Products: React.FC = observer(() => {
  const resipes = useRecipeStore();
  const scrollPositionRef = useRef<number>(0);
  const scrollStoreRef = useRef<ScrollStore | null>(null);

  useEffect(() => {
    scrollStoreRef.current = new ScrollStore(scrollPositionRef);

    return () => {
      scrollStoreRef.current?.destroy();
      scrollStoreRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (scrollPositionRef.current !== 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
    }
  }, [resipes.cleanRecipes]);

  const [isArray, setIsArray] = useState<boolean>(false);

  const handleArray = useCallback(() => {
    smoothScrollTo(0);
  }, [resipes]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = 2500;

      if (scrollPosition > triggerPosition) {
        setIsArray(true);
      } else {
        setIsArray(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`${s.ProductsElements} ${resipes.cleanRecipes.length === 0 || resipes.cleanRecipesLoading ? s.ProductsElementsNull : ''}`}
      >
        {resipes.cleanRecipesLoading && (
          <div className={s.loader}>
            <Loader className={s.loader__svg} />
          </div>
        )}
        {!resipes.cleanRecipesLoading && resipes.cleanRecipes.length === 0 && (
          <Text className={s.recipesNull}>
            According to these parameters, no recipes were found
          </Text>
        )}
        {!resipes.cleanRecipesLoading &&
          resipes.cleanRecipes.map((item: Recipe, index: number) => {
            const cleanedSummary = item.summary
              .replace(/<a[^>]*>(.*?)<\/a>/g, '<span>$1</span>')
              .replace(/<p[^>]*>(.*?)<\/p>/g, '<div>$1</div>');
            return (
              <Link key={index} href={`/recipe/${item.documentId}`} style={{ textDecoration: 'none' }}>
                  <Card
                    image={item.images}
                    title={item.name}
                    subtitle={parse(cleanedSummary)}
                    contentSlot={<p className={s.slot}>{item.calories} kcal</p>}
                  />
              </Link>
            );
          })}
        {isArray && (
          <div className={s.arrayTop}>
            <Image src={arrayTop} alt="" onClick={handleArray} width={80} height={80}/>
          </div>
        )}
      </div>
    </>
  );
});

export default Products;

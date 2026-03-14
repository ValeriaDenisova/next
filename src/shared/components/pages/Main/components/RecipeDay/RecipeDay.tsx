"use client";
import { useCallback, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import parse from "html-react-parser";
import Image from "next/image";
import Text from "@components/Text";
import Button from "@/shared/components/Button";
import Modal from "@components/Modal";
import { dinnerNumber } from "@/shared/utils";
import s from "./RecipeDay.module.scss";
import RecipeDayStore from "@store/locals/RecipeDayStore";

interface RecipeDayProps {
  total: number;
}

const RecipeDay: React.FC<RecipeDayProps> = observer(({ total }) => {
  const recipeDayStore = useMemo(() => new RecipeDayStore(), []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [num, setNum] = useState<number | null>(null);
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setNum(dinnerNumber(total));
  }, [total]);
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (num !== null) {
      recipeDayStore.fetchRecipes(num);
    }
  }, [num, recipeDayStore]);

  useEffect(() => {
    return () => {
      recipeDayStore.destroy?.();
    };
  }, [recipeDayStore]);

  const recipe = recipeDayStore.getRecipe;
  const cleanedSummary = recipe?.summary
    .replace(/<a[^>]*>(.*?)<\/a>/g, "<span>$1</span>")
    .replace(/<p[^>]*>(.*?)<\/p>/g, "<div>$1</div>");

  return (
    <div className={s.recipeDay}>
      <Text className={s.recipeDay__text}>What to cook today?</Text>
      <Button className="cursor" onClick={handleOpen}>
        Choose
      </Button>
      <Modal isModal={isOpen} onClose={handleClose} title="For dinner tonight">
        <div className={s.modal}>
          <div className={s.modal__info}>
            <div className={s.modal__img}>
              {recipe?.images && (
                <Image
                  className={s.img}
                  src={recipe?.images}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 50vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            <div>
              <Text className={s.title}>{recipe?.name}</Text>
              {cleanedSummary && <Text className={s.summary}>{parse(cleanedSummary)}</Text>}
              <Text className={s.kcal}>{recipe?.calories} kcal</Text>
            </div>
          </div>
          <div className={s.modal__button}>
            <Link
              className={s.modal__link}
              href={`/recipe/${recipe?.documentId}`}
              style={{ textDecoration: "none" }}
            >
              <Button className={`cursor ${s.button}`}>Go to the recipe page</Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default RecipeDay;

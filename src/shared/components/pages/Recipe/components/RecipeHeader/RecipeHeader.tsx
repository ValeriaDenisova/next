"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import Text from "@components/Text";
import Button from "@components/Button";
import { useFavoritesStore } from "@store/hooks/globalStores";
import RecipeInfoStore from "@store/locals/RecipeInfoStore";
import { ParamValue } from "next/dist/server/request/params";
import Back from "@components/icons/Back";
import Basket from "@components/icons/Basket";
import Modal from "@components/Modal";
import Input from "@components/Input";
import { capitalizeFirstLetter } from "@/shared/utils";
import s from "./RecipeHeader.module.scss";

interface RecipeHeaderProps {
  loading: boolean;
  info: RecipeInfoStore;
  id: ParamValue;
  name: string;
  ingradients?: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  }[];
  token?: boolean;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = observer(
  ({ loading, info, id, name, ingradients, token }) => {
    const favorites = useFavoritesStore();
    const [value, setValue] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [ordered, setOrdered] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const showTokenBlock = mounted && Boolean(token);

    return (
      <>
        <div className={s.resipeHeader}>
          <div className={s.resipeHeader__left}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div className={s.back}>
                <Back width="32" height="32" viewBox="0 0 32 32" fill="none" color="secondary" />
              </div>
            </Link>
            <Text className={s.title}>{name}</Text>
          </div>
          <div className={s.burron}>
            {showTokenBlock && !loading && !info.isFavorite && (
              <Button
                className={`cursor ${s.resipeHeader__button}`}
                onClick={() => {
                  favorites.fetchAdd(id);
                }}
              >
                Add to Favorites
              </Button>
            )}
            {showTokenBlock && !loading && info.isFavorite && (
              <Button
                className={`cursor ${s.resipeHeader__button}`}
                onClick={() => {
                  favorites.fetchDelete(id);
                }}
              >
                Delete to Favorites
              </Button>
            )}

            {showTokenBlock && !loading && (
              <Button
                search={true}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Basket
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="cursor"
                  style={{ color: "#fff" }}
                />
              </Button>
            )}
          </div>
        </div>

        <Modal
          isModal={open}
          onClose={() => {
            setOpen(false);
          }}
          title="Order ingredients"
        >
          {!ordered && (
            <>
              <div className={s.input}>
                <Text className={s.numberPeople}>Number of people: </Text>
                <Input
                  value={value}
                  onChange={(v: string) => {
                    const digits = v.replace(/\D/g, "");
                    setValue(digits);
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Введите колличество человек"
                />
              </div>
              <div className={s.ingradients}>
                {ingradients?.map((ing, index) => {
                  return (
                    <Text key={index} className={s.ingradientsText}>
                      {capitalizeFirstLetter(ing.name)}: {Number(value) * ing.amount} {ing.unit}
                    </Text>
                  );
                })}
              </div>
              <div className={`${s.modal__button} cursor`}>
                <Button
                  onClick={() => {
                    setOrdered(true);
                  }}
                >
                  To order
                </Button>
              </div>
            </>
          )}
          {ordered && (
            <div className={s.ordered}>
              <Text className={s.ordered__text}>Thanks for ordering!</Text>
              <Text className={s.ordered__text}>The courier will contact you</Text>
              <Button
                onClick={() => {
                  setOrdered(false);
                  setValue("");
                }}
                className={`${s.order__button} cursor`}
              >
                Order more
              </Button>
            </div>
          )}
        </Modal>
      </>
    );
  },
);

export default RecipeHeader;

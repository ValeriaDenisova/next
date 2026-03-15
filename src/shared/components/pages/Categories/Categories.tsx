import React from "react";
import Image from "next/image";
import type { Categories } from "@entities/api/Categories";
import CategoriesTitle from "./components/CategoriesTitle";
import Link from "next/link";
import MainHader from "../../MainHeader/MainHader";
import s from "./Categories.module.scss";

interface CategoriesProps {
  initialCategories: Categories[];
}

const Categories: React.FC<CategoriesProps> = ({ initialCategories }) => {
  return (
    <>
      <MainHader title="Meal Categories" />
      <div className="wrapper">
        <div className={`${s.categories}`}>
          {initialCategories.map((c) => (
            <Link
              href={`/categories/recipe/${c.id}_${c.title.trim().replace(/\s+/g, "-")}`}
              key={c.id}
              style={{ textDecoration: "none" }}
            >
              <div className={s.link}>
                <Image className={s.img} src={c.image} alt="" width={200} height={100} />
                <CategoriesTitle title={c.title} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(Categories);

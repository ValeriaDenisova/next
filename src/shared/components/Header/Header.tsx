"use client";
import React from "react";
import Text from "@components/Text";
import Menu from "./components/Menu";
import Modal from "@components/Modal";
import FavoriteRecipes from "./components/FavoriteRecipes";
import SingInTo from "./components/SignInTo";
import { useHeader } from "./useHeader";
import s from "./Header.module.scss";
import Logo from "../icons/Logo";
import Like from "../icons/Like";
import Enter from "../icons/Enter";

const Header: React.FC = () => {
  const {
    isMenuOpen,
    toggleMenu,
    isFavourite,
    handleFavoriteOpen,
    handleFavoriteClose,
    isEntrance,
    handleEntranceOpen,
    handleEntranceClose,
  } = useHeader();

  return (
    <>
      <div className={s.header}>
        <div className={`wrapper ${s.header__container}`}>
          <div className={s.header__left}>
            <div className={s.logo}>
              <div>
                <Logo width="36" height="36" viewBox="0 0 36 36" fill="none" color="secondary" />
              </div>
              <Text className={s.logo__text}>Food Client</Text>
            </div>
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
          </div>
          <div className={s.header__right}>
            <div className={s.header__entrance}>
              <div className="cursor" onClick={handleFavoriteOpen}>
                <Like width="19" height="19" viewBox="0 0 19 19" fill="none" color="secondary" />
              </div>
              <div className="cursor" onClick={handleEntranceOpen}>
                <Enter width="24" height="24" viewBox="0 0 24 24" fill="none" color="secondary" />
              </div>
            </div>
            <div className={s.burger} onClick={toggleMenu}>
              <div className={s.burger__line}></div>
              <div className={s.burger__line}></div>
              <div className={s.burger__line}></div>
            </div>
          </div>
        </div>
      </div>
      <Modal isModal={isFavourite} onClose={handleFavoriteClose} title={"Favorite recipes"}>
        <FavoriteRecipes onFavoriteClose={handleFavoriteClose} />
      </Modal>

      <Modal isModal={isEntrance} onClose={handleEntranceClose} title={"Access Your Account"}>
        {<SingInTo />}
      </Modal>
    </>
  );
};

export default React.memo(Header);

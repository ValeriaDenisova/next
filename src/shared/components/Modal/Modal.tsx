import React from "react";
import Text from "@components/Text";
import s from "./Modal.module.scss";

interface modalProps {
  isModal: boolean;
  onFavoriteClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<modalProps> = ({ isModal, onFavoriteClose, title, children }) => {
  return (
    isModal && (
      <div className={s.modal}>
        <div className={s.modal__container}>
          <div className={s.modal__close} onClick={onFavoriteClose}>
            &times;
          </div>
          <Text className={s.title}>{title}</Text>
          {children}
        </div>
      </div>
    )
  );
};

export default React.memo(Modal);

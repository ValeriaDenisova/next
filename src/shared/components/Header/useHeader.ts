import { useState, useCallback } from 'react';

export function useHeader() {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const handleFavoriteOpen = useCallback(() => {
    setIsFavourite(true);
  }, []);

  const handleFavoriteClose = useCallback(() => {
    setIsFavourite(false);
  }, []);

  const [isEntrance, setIsEntrance] = useState<boolean>(false);

  const handleEntranceOpen = useCallback(() => {
    setIsEntrance(true);
  }, []);

  const handleEntranceClose = useCallback(() => {
    setIsEntrance(false);
  }, []);

  return {
    isMenuOpen,
    toggleMenu,
    isFavourite,
    handleFavoriteOpen,
    handleFavoriteClose,
    isEntrance,
    handleEntranceOpen,
    handleEntranceClose,
  };
}

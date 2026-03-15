import { useRootStore } from "@store/globals/root/RootStore";

export const useUserStore = () => useRootStore().user;
export const useFavoritesStore = () => useRootStore().favorites;
export const useCategoriesStore = () => useRootStore().categories;
export const useRecipeStore = () => useRootStore().resipes;
export const useLogInStore = () => useRootStore().logInStore;
export const useRecipeDietsStore = () => useRootStore().recipeDiets;

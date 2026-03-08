import type ApiStore from '@store/globals/ApiStore';
import type SingInToStore from '@store/globals/SingInToStore';
import type UserStore from '@store/globals/UserStore';
import type FavoritesStore from '@store/globals/FavoritesStore';
import type CategoriesStore from '@store/globals/CategoriesStore';
import type RecipeStore from '@store/globals/RecipeStore';

export interface IRootStore {
  token: string | null;
  setToken(token: string | null): void;
  clearToken(): void;

  api: ApiStore;
  singInToStore: SingInToStore;
  userStore: UserStore;
  favoritesStore: FavoritesStore;
  categories: CategoriesStore;
  resipes: RecipeStore;
}
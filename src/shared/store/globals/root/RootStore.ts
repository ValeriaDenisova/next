import { makeAutoObservable } from 'mobx';
import ApiStore from '@store/globals/ApiStore';
import UserStore from '@store/globals/UserStore';
import FavoritesStore from '@store/globals/FavoritesStore';
import CategoriesStore from '@store/globals/CategoriesStore';
import RecipeStore from '@store/globals/RecipeStore';
import SingInToStore from '@store/globals/SingInToStore';
import { initStoreContext } from '@utils/initStoreContext';
import { API_BASE_URL } from '@config/apiConfig';

export class RootStore implements IRootStore{
  readonly api: ApiStore;
  readonly user: UserStore;
  readonly favorites: FavoritesStore;
  readonly categories: CategoriesStore;
  readonly resipes: RecipeStore;
  readonly singInToStore: SingInToStore;

  private _token: string | null = null;

  constructor() {
    this._token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null;

    // this.api = new ApiStore(API_BASE_URL);
    this.api = new ApiStore(API_BASE_URL, () => this.token);
    this.user = new UserStore(this);
    this.favorites = new FavoritesStore(this);
    this.categories = new CategoriesStore(this);
    this.resipes = new RecipeStore(this);
    this.singInToStore = new SingInToStore(this);

    makeAutoObservable(this);
  }

  get token(): string | null {
    if (this._token) return this._token;
    if (typeof window !== 'undefined') this._token = localStorage.getItem('token');
    return this._token;
  }

  setToken(token: string | null) {
    this._token = token;
    if (typeof window !== 'undefined') {
      if (token) localStorage.setItem('token', token);
      else localStorage.removeItem('token');
    }
  }

  clearToken() {
    this.setToken(null);
  }
}

export type IRootStore = RootStore;

export const {
  store: rootStore,
  StoreProvider: RootStoreProvider,
  useStoreContext: useRootStore,
} = initStoreContext(() => new RootStore(), 'rootStore');

import { makeAutoObservable, runInAction } from "mobx";
import ApiStore from "@store/globals/ApiStore";
import UserStore from "@store/globals/UserStore";
import FavoritesStore from "@store/globals/FavoritesStore";
import CategoriesStore from "@store/globals/CategoriesStore";
import RecipeStore from "@store/globals/RecipeStore";
import SingInToStore from "@store/globals/SingInToStore";
import { initStoreContext } from "@utils/initStoreContext";
import { API_BASE_URL, API_URL } from "@config/apiConfig";
import LogInStore from "../LogInStore";
import RecipeDietsStope from "../RecipeDietsStore";

export class RootStore implements IRootStore {
  readonly api: ApiStore;
  readonly user: UserStore;
  readonly favorites: FavoritesStore;
  readonly categories: CategoriesStore;
  readonly resipes: RecipeStore;
  readonly singInToStore: SingInToStore;
  readonly logInStore: LogInStore;
  readonly apiDiets: ApiStore;
  readonly recipeDiets: RecipeDietsStope;

  private _token: string | null = null;
  private _username: string | null | undefined = null;

  constructor() {
    this._token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    this._username = typeof window !== "undefined" ? localStorage.getItem("username") : null;
    this.api = new ApiStore(API_BASE_URL, () => this.token);
    this.user = new UserStore(this);
    this.favorites = new FavoritesStore(this);
    this.categories = new CategoriesStore(this);
    this.resipes = new RecipeStore(this);
    this.singInToStore = new SingInToStore(this);
    this.logInStore = new LogInStore(this);
    this.apiDiets = new ApiStore(API_URL, () => this.token);
    this.recipeDiets = new RecipeDietsStope(this);

    makeAutoObservable(this);
  }

  get token(): string | null {
    runInAction(() => {
      if (this._token) return this._token;
      if (typeof window !== "undefined") this._token = localStorage.getItem("token");
    });
    return this._token;
  }

  get username(): string | null | undefined {
    runInAction(() => {
      if (this._username) return this._username;
      if (typeof window !== "undefined") this._username = localStorage.getItem("username");
    });
    return this._username;
  }

  setToken(token: string | null, username: string | null | undefined) {
    this._token = token;
    this._username = username;
    this.favorites.setToken(token);
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");

      if (username) localStorage.setItem("username", username);
      else localStorage.removeItem("username");
    }
  }

  clearToken() {
    this.setToken(null, null);
    this.favorites.setToken(null);
  }
}

export type IRootStore = RootStore;

export const {
  store: rootStore,
  StoreProvider: RootStoreProvider,
  useStoreContext: useRootStore,
} = initStoreContext(() => new RootStore(), "rootStore");

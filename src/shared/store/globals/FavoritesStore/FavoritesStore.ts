import { runInAction, makeAutoObservable, toJS, reaction } from 'mobx';
import { normalizeFavorites, type FavoritesApi, type Favorites } from '@entities/api/Favorites';
import ApiStore from '../ApiStore';
import { API_BASE_URL } from '@config/apiConfig';
import { ParamValue } from 'next/dist/server/request/params';
import type { IRootStore } from '../root/RootStore';

export default class FavoritesStore {
  recipes: Favorites[] = [];
  loading: boolean = false;
  error: string | null = null;

  private apiWithAuth: ApiStore;
  private _rootStore: IRootStore;

  constructor(root: IRootStore) {
    makeAutoObservable(this);
    this._rootStore = root;
    this.apiWithAuth = new ApiStore(API_BASE_URL, () => this._rootStore.token);
  }

  async fetchRecipes() {
    runInAction(() => {
      this.loading = true;
      this.error = null;
      this.recipes = [];
    });

    try {
      const response = await this.apiWithAuth.requestWithAuth<FavoritesApi[]>({
        method: 'GET',
        endpoint: '/favorites',
        data: {},
      });

      if (response.success) {
        runInAction(() => {
          this.recipes = normalizeFavorites(response.data);
        });
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
        });
      }
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при получении рецептов';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchAdd(id: ParamValue) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await this.apiWithAuth.requestWithAuth<unknown>({
        method: 'POST',
        endpoint: `/favorites/add`,
        data: { recipe: id },
      });

      if (response.success) {
        runInAction(() => {
        });
        await this.fetchRecipes();
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
        });
      }
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при добавлении любимого рецепта';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchDelete(id: ParamValue) {
    runInAction(() => {
      // this.delete = false;
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await this.apiWithAuth.requestWithAuth<unknown>({
        method: 'POST',
        endpoint: `/favorites/remove`,
        data: { recipe: id },
      });

      if (response.success) {
        runInAction(() => {
          // this.delete = true;
        });
        await this.fetchRecipes();
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
        });
      }
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при удалении любимого рецепта';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get cleanRecipes(): Favorites[] {
    return toJS(this.recipes);
  }

  get cleanLoading(): boolean {
    return this.loading;
  }
}


import { makeAutoObservable, runInAction, toJS } from "mobx";
import { normalizeCategories, type CategoriesApi, type Categories } from "@entities/api/Categories";
import type { IRootStore } from "../root/RootStore";

export default class CategoriesStore {
  categories: Categories[] = [];
  loading: boolean = false;
  error: string | null = null;

  private _rootStore: IRootStore;

  constructor(root: IRootStore) {
    makeAutoObservable(this);
    this._rootStore = root;
  }

  async fetchRecipes() {
    runInAction(() => {
      this.categories = [];
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await this._rootStore.api.request<{
        data: CategoriesApi[];
      }>({
        method: "GET",
        endpoint: `/meal-categories`,
        headers: {},
        data: {},
      });

      if (response.success) {
        runInAction(() => {
          this.categories = normalizeCategories(response.data.data);
        });
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
        });
      }
    } catch {
      runInAction(() => {
        this.error = "Ошибка при получении рецептов";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  hydrate(categories: Categories[]) {
    this.categories = categories;
    this.loading = false;
  }

  get cleanCategories(): Categories[] {
    return toJS(this.categories);
  }

  get categoriesLoader(): boolean {
    return toJS(this.loading);
  }
}

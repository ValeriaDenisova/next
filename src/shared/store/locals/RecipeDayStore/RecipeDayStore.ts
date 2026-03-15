import { makeAutoObservable, toJS, runInAction } from "mobx";
import { type Recipe, type RecipeApi, normalizeRecipe } from "@entities/api/Recipe";
import { rootStore, RootStore } from "@store/globals/root/RootStore";
import type { ILocalStore } from "@entities/ILocalStore";

export default class RecipeDayStore implements ILocalStore {
  recipe: Recipe | null = null;
  loading: boolean = false;
  error: string | null = null;

  private _rootStore: RootStore;
  private _isDestroyed: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this._rootStore = rootStore;
  }

  async fetchRecipes(total: number | null) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
      this.recipe = null;
    });

    try {
      const response = await this._rootStore.api.request<{
        data: RecipeApi[];
        meta: { pagination: { total: number } };
      }>({
        method: "GET",
        endpoint: "/recipes",
        headers: {},
        data: {
          pagination: { limit: 1, start: total },
          populate: "images",
        },
      });

      if (response.success) {
        runInAction(() => {
          this.recipe = normalizeRecipe(response.data.data)[0];
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

  get getRecipe(): Recipe | null {
    return toJS(this.recipe);
  }

  private resetState(): void {
    this.recipe = null;
    this.loading = false;
    this.error = null;
  }

  destroy(): void {
    this._isDestroyed = true;
    this.resetState();
  }
}

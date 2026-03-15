import { makeAutoObservable, toJS } from "mobx";
import { type RecipeInfo } from "@entities/api/RecipeInfo";
import { rootStore, RootStore } from "@store/globals/root/RootStore";
import type { ILocalStore } from "@entities/ILocalStore";
import { ParamValue } from "next/dist/server/request/params";

export default class RecipeInfoStore implements ILocalStore {
  recipeInfo: RecipeInfo | null = null;
  loading: boolean = false;
  error: string | null = null;
  id: ParamValue;

  private _rootStore: RootStore;

  private _isDestroyed = false;

  constructor(id: ParamValue) {
    makeAutoObservable(this);
    this._rootStore = rootStore;
    this.id = id;
  }

  private resetState() {
    this.recipeInfo = null;
    this.loading = false;
    this.error = null;
  }

  hydrate(recipe: RecipeInfo) {
    this.recipeInfo = recipe;
    this.loading = false;
  }

  destroy(): void {
    this._isDestroyed = true;
    this.resetState();
  }

  get cleanRecipeInfo(): RecipeInfo | null {
    return toJS(this.recipeInfo);
  }

  get cleanLoading(): boolean {
    return this.loading;
  }

  get isFavorite(): boolean {
    return this._rootStore.favorites.cleanRecipes.some((item) => item.documentId === this.id);
  }
}

import { makeAutoObservable, toJS, runInAction } from "mobx";
import { normalizeRecipeDiets, RecipeDiets, RecipeDietsApi } from "@entities/api/RecipeDiets";
import type { IRootStore } from "../root/RootStore";

export default class RecipeDietsStope {
  recipes: RecipeDiets[] = [];
  loading: boolean = false;
  error: string | null = null;

  private _rootStore: IRootStore;

  constructor(root: IRootStore) {
    makeAutoObservable(this);
    this._rootStore = root;
  }

  async fetchRecipes(diets: string[], excludeCuisine: string[]) {
    const off = Math.floor(Math.random() * 51);

    runInAction(() => {
      this.loading = true;
      this.error = null;
      this.recipes = [];
    });

    try {
      const response = await this._rootStore.apiDiets.request<{
        results: RecipeDietsApi[];
      }>({
        method: "GET",
        endpoint: "/complexSearch",
        headers: {},
        data: {
          diet: diets,
          excludeCuisine: excludeCuisine,
          offset: off,
          apiKey: "21ef1f6b2e3a41448e389f74748b667a",
        },
      });

      if (response.success) {
        runInAction(() => {
          const raw = response.data?.results ?? [];
          this.recipes = normalizeRecipeDiets(raw);
        });
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
          console.log("error");
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

  get getLoading(): boolean {
    return this.loading;
  }
  get getRecipes(): RecipeDiets[] {
    return toJS(this.recipes);
    // return [
    //   {
    //     id: 1,
    //     title: "Рецепт 1",
    //     image: "",
    //   },
    //   {
    //     id: 2,
    //     title: "Рецепт 2",
    //     image: "",
    //   },
    //   {
    //     id: 3,
    //     title: "Рецепт 3",
    //     image: "",
    //   },
    //   {
    //     id: 4,
    //     title: "Рецепт 4",
    //     image: "",
    //   },
    //   {
    //     id: 5,
    //     title: "Рецепт 5",
    //     image: "",
    //   },
    //   {
    //     id: 6,
    //     title: "Рецепт 6",
    //     image: "",
    //   },
    //   {
    //     id: 7,
    //     title: "Рецепт 7",
    //     image: "",
    //   },
    //   {
    //     id: 8,
    //     title: "Рецепт 8",
    //     image: "",
    //   },
    //   {
    //     id: 9,
    //     title: "Рецепт 9",
    //     image: "",
    //   },
    //   {
    //     id: 10,
    //     title: "Рецепт 10",
    //     image: "",
    //   },
    // ];
  }
}

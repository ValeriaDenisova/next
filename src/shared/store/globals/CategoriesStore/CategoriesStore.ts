import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { normalizeCategories, type CategoriesApi, type Categories } from '@entities/api/Categories';
import type { IRootStore } from '../root/RootStore';
import { normalizeRecipe, type Recipe } from '@entities/api/Recipe';
import { Option } from '@components/MultiDropdown';

export default class CategoriesStore {
  categories: CategoriesApi[] = [];
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
      const response = await this._rootStore.api.request<{ data: CategoriesApi[] }>({
        method: 'GET',
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
        this.error = 'Ошибка при получении рецептов';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async loadCategoriesAndRecipes(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    categoryFilters?: Option[]; 
  }){
    let recipes: Recipe[] = [];
    try {
    const [catRes, recRes] = await Promise.all([
      this._rootStore.api.request<{ data: any[] }>({
        method: 'GET',
        endpoint: '/meal-categories',
        data: {}
      }),
      this._rootStore.api.request<{ data: any[]; meta?: any }>({
        method: 'GET',
        endpoint: '/recipes',
        data: {
          pagination: { page: params.page ?? 1, pageSize: params.pageSize ?? 9 },
          populate: 'images',
          filters: {
            category: { id: { $in: params.categoryFilters ?? [] } },
            name: { $containsi: params.search ?? '' }
          }
        }
      })
    ]);
  
    runInAction(() => {
    if (catRes.success) {
        this.categories = normalizeCategories(catRes.data.data);
      } else {
        this.error = 'Не удалось загрузить категории';
      }

    if (recRes.success) {
      recipes = normalizeRecipe(recRes.data.data ?? recRes.data);
      } else {
        this.error = (this.error ? this.error + ' | ' : '') + 'Не удалось загрузить рецепты';
      }
          });
    } catch {
      this.error = 'Сеть или парсинг недоступны';
    } finally {
      this.loading = false;
    }

    return recipes;
}

  get cleanCategories(): Categories[] {
    return toJS(this.categories);
  }

  get categoriesLoader(): boolean {
    return toJS(this.loading);
  }
}

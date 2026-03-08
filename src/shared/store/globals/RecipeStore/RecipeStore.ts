// import { makeAutoObservable, toJS, runInAction, reaction } from 'mobx';
// import { normalizeRecipe, type RecipeApi, type Recipe } from '@entities/api/Recipe';
// import type { IRootStore } from '../root/RootStore';
// import type { Option } from '@components/MultiDropdown/MultiDropdown';

// const PAGE_SIZE = 9;

// export default class RecipeStore {
//   recipes: Recipe[] = [];
//   loading: boolean = false;
//   error: string | null = null;
//   totalPage: number | undefined;
//   page: number = 1;
//   pageSize: number = PAGE_SIZE;
//   filtersCategory: Option[] = [];
//   filtersCategoryParam: (string | number)[] = [];
//   search: string = '';
//   loadedTotal: number | undefined;

//   private _rootStore: IRootStore;

//   constructor(root: IRootStore) {
//     makeAutoObservable(this);
//     this._rootStore = root;
//     const urlParams = new URLSearchParams(window.location.search);
//     const searchParam = urlParams.get('search');
//     if (searchParam) {
//       this.search = searchParam;
//     }

//     const categoriesJSON = urlParams.get('category');

//     if (categoriesJSON) {
//       try {
//         const categoriesFromUrl = JSON.parse(decodeURIComponent(categoriesJSON));
//         this.filtersCategory = categoriesFromUrl;
//         this.handleFiltersCategory();
//       } catch (e) {
//         console.error('Ошибка при разборе категорий из URL', e);
//       }
//     }

//     reaction(
//       () => this.totalPage,
//       (total) => {
//         if (total && total > 0) {
//           this.loadedTotal = total;
//         }
//       }
//     );

//     reaction(
//       () => [this.page, this.pageSize, this.filtersCategoryParam, this.search] as const,
//       () => {
//         this.fetchRecipes();
//       }
//     );
//     reaction(
//       () => this.filtersCategoryParam,
//       () => {
//         this.pageSize = PAGE_SIZE;
//       }
//     );
//     reaction(
//       () => this.search,
//       () => {
//         this.pageSize = PAGE_SIZE;
//       }
//     );
//   }

//   async fetchRecipes() {
//     runInAction(() => {
//       this.loading = true;
//       this.error = null;
//       this.recipes = [];
//       this.totalPage = 0;
//     });

//     try {
//       const response = await this._rootStore.api.request<{
//         data: RecipeApi[];
//         meta: { pagination: { total: number } };
//       }>({
//         method: 'GET',
//         endpoint: '/recipes',
//         headers: {},
//         data: {
//           pagination: { page: this.page, pageSize: this.pageSize },
//           populate: 'images',
//           filters: {
//             category: {
//               id: {
//                 $eq: this.filtersCategoryParam,
//               },
//             },
//             name: {
//               $containsi: this.search,
//             },
//           },
//         },
//       });

//       if (response.success) {
//         runInAction(() => {
//           this.recipes = normalizeRecipe(response.data.data);
//           this.totalPage = response.data.meta?.pagination?.total;
//         });
//       } else {
//         runInAction(() => {
//           this.error = `Ошибка: статус ${response.status}`;
//         });
//       }
//     } catch {
//       runInAction(() => {
//         this.error = 'Ошибка при получении рецептов';
//       });
//     } finally {
//       runInAction(() => {
//         this.loading = false;
//       });
//     }
//   }

//   get cleanRecipes(): Recipe[] {
//     return toJS(this.recipes);
//   }

//   get cleanRecipesLoading(): boolean {
//     return this.loading;
//   }
//   get getTotal(): number {
//     console.log(this.totalPage);
//     return this.totalPage ? this.totalPage : 0;
//   }

//   setPage(value: number) {
//     this.page = value;
//   }

//   setPageSize(value: number) {
//     this.pageSize = value;
//   }

//   setFiltersCategory(value: Option[]) {
//     this.filtersCategory = value;
//     this.handleFiltersCategory();
//   }

//   setSearch(value: string) {
//     this.search = value;
//     this.paramSearch();
//   }

//   get getPage() {
//     return this.page;
//   }

//   get getPageSize() {
//     return this.pageSize;
//   }

//   get getFiltersCategoryParam() {
//     return this.filtersCategoryParam;
//   }

//   get getSearch() {
//     return this.search;
//   }

//   get total() {
//     return this.loadedTotal;
//   }

//   paramSearch = () => {
//     const params = new URLSearchParams(window.location.search);
//     if (this.getSearch) {
//       params.set('search', this.getSearch);
//     } else {
//       params.delete('search');
//     }
//     const newUrl = `${window.location.pathname}?${params.toString()}`;
//     window.history.replaceState(null, '', newUrl);
//   };

//   handleFiltersCategory = () => {
//     this.filtersCategoryParam = this.filtersCategory.map((option) => option.key);
//   };
// }


import { makeAutoObservable, toJS, runInAction, reaction } from 'mobx';
import { normalizeRecipe, type RecipeApi, type Recipe } from '@entities/api/Recipe';
import type { IRootStore } from '../root/RootStore';
import type { Option } from '@components/MultiDropdown/MultiDropdown';

const PAGE_SIZE = 9;

export default class RecipeStore {
  recipes: Recipe[] = [];
  loading: boolean = false;
  error: string | null = null;
  totalPage: number | undefined;
  page: number = 1;
  pageSize: number = PAGE_SIZE;
  filtersCategory: Option[] = [];
  filtersCategoryParam: (string | number)[] = [];
  search: string = '';
  loadedTotal: number | undefined;

  private _rootStore: IRootStore;

  constructor(root: IRootStore ) {
    makeAutoObservable(this);
    this._rootStore = root;


    reaction(
      () => this.totalPage,
      (total) => {
        if (total && total > 0) {
          this.loadedTotal = total;
        }
      }
    );

    this.initLoadAll();

      reaction(
     
      () => this._depsKey,
      () => {
        if (typeof window === 'undefined') return;
        this.fetchRecipes();
      },
      { fireImmediately: false }
    );

    reaction(
      () => this.filtersCategoryParam,
      () => {
        this.pageSize = PAGE_SIZE;
      }
    );

    reaction(
      () => this.search,
      () => {
        this.pageSize = PAGE_SIZE;
      }
    );
  }

  initializeFromUrlParams(searchParams: URLSearchParams) {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      this.search = searchParam;
    }
    const categoriesJSON = searchParams.get('category');
    if (categoriesJSON) {
      try {
        const categoriesFromUrl = JSON.parse(decodeURIComponent(categoriesJSON));
        this.filtersCategory = categoriesFromUrl;
        this.handleFiltersCategory();
      } catch (e) {
        console.error('Ошибка при разборе категорий из URL', e);
      }
    }
  }


  async fetchRecipes() {
    runInAction(() => {
      this.loading = true;
      this.error = null;
      this.recipes = [];
      this.totalPage = 0;
    });

    try {
      const response = await this._rootStore.api.request<{
        data: RecipeApi[];
        meta: { pagination: { total: number } };
      }>({
        method: 'GET',
        endpoint: '/recipes',
        headers: {},
        data: {
          pagination: { page: this.page, pageSize: this.pageSize },
          populate: 'images',
          filters: {
            category: {
              id: {
                $eq: this.filtersCategoryParam,
              },
            },
            name: {
              $containsi: this.search,
            },
          },
        },
      });

      if (response.success) {
        runInAction(() => {
          this.recipes = normalizeRecipe(response.data.data);
          this.totalPage = response.data.meta?.pagination?.total;
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

  get cleanRecipes(): Recipe[] {
    return toJS(this.recipes);
  }

  get cleanRecipesLoading(): boolean {
    return this.loading;
  }

  get getTotal(): number {
    console.log(this.totalPage);
    return this.totalPage ? this.totalPage : 0;
  }

  setPage(value: number) {
    this.page = value;
  }

  setPageSize(value: number) {
    this.pageSize = value;
  }

  setFiltersCategory(value: Option[]) {
    this.filtersCategory = value;
    this.handleFiltersCategory();
  }

  setSearch(value: string) {
    this.search = value;
    this.paramSearch();
  }

  get getPage() {
    return this.page;
  }

  get getPageSize() {
    return this.pageSize;
  }

  get getFiltersCategoryParam() {
    return this.filtersCategoryParam;
  }

  get getSearch() {
    return this.search;
  }

  get total() {
    return this.loadedTotal;
  }

  paramSearch = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (this.getSearch) {
        params.set('search', this.getSearch);
      } else {
        params.delete('search');
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  handleFiltersCategory = () => {
    this.filtersCategoryParam = this.filtersCategory.map((option) => option.key);
  };


  private async initLoadAll(): Promise<void> {
    if (typeof window === 'undefined') {
      runInAction(() => {
        this.loading = false;
      });
      return;
    }

    try {
      const recipes = await this._rootStore.categories.loadCategoriesAndRecipes({
        page: this.page,
        pageSize: this.pageSize,
        search: this.search,
        categoryFilters: this.filtersCategory
      });

      runInAction(() => {
        this.recipes = recipes;
      });
    } catch {
      runInAction(() => {
        this.error = 'Сеть или парсинг недоступны';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

    get _depsKey(): string {
      const filters = this.filtersCategoryParam.join(',');
      return `${this.page}|${this.pageSize}|${this.search}|${filters}`;
    }
}


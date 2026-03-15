import { makeAutoObservable, runInAction, toJS } from "mobx";
import {
  normalizeSingInTo,
  type SingInToApi,
  type SingInToHead,
  type SingInTo,
} from "@entities/api/SingInTo";
import type { IRootStore } from "../root/RootStore";

export default class SingInToStore {
  data: SingInTo | null = null;
  loading: boolean = false;
  error: string | null = null;

  private _rootStore: IRootStore;

  constructor(root: IRootStore) {
    makeAutoObservable(this);
    this._rootStore = root;
  }

  async fetchRecipes(head: Partial<SingInToHead>) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
      this.data = null;
    });

    try {
      const response = await this._rootStore.api.request<SingInToApi>({
        method: "POST",
        endpoint: "/auth/local",
        headers: {},
        data: head,
      });

      if (response.success) {
        runInAction(() => {
          this.data = normalizeSingInTo(response.data);
        });
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
        });
      }
    } catch {
      runInAction(() => {
        this.error = "Ошибка при авторизации";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get cleanSingInToUser(): SingInTo | null {
    return toJS(this.data);
  }

  get cleanSingInToError(): string | null {
    return this.error;
  }
}

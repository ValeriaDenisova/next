import { makeAutoObservable, runInAction } from "mobx";
import { LogInHead } from "@entities/api/LogIn";
import type { IRootStore } from "../root/RootStore";

type ErrorInfo = { error?: { message?: string } };
type ApiResponse = { success: boolean; status?: number; data?: ErrorInfo };

export default class LogInStore {
  loading: boolean = false;
  error: string | null = null;
  result: boolean = false;
  errorText: string | undefined = "";

  private _rootStore: IRootStore;

  constructor(root: IRootStore) {
    makeAutoObservable(this);
    this._rootStore = root;
  }

  async fetchRecipes(head: LogInHead) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
      this.result = false;
    });

    try {
      const response = (await this._rootStore.api.request({
        method: "POST",
        endpoint: "/auth/local/register",
        headers: {},
        data: head,
      })) as ApiResponse;

      if (response.success) {
        runInAction(() => {
          this.result = true;
        });
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
          this.errorText = response?.data?.error?.message;
        });
      }
    } catch {
      runInAction(() => {
        this.error = "Ошибка при регистрации";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get isResult(): boolean {
    return this.result;
  }
  get isError(): string | undefined {
    return this.errorText;
  }
}

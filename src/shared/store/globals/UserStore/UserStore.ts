import { runInAction, makeAutoObservable } from "mobx";
import type { IRootStore } from "../root/RootStore";

export default class UserStore {
  username: string | undefined | null;

  private _rootStore: IRootStore;

  constructor(root: IRootStore) {
    makeAutoObservable(this);
    this._rootStore = root;
    this.username = this._rootStore.username;
  }

  async entrance(login?: string, password?: string) {
    await this._rootStore.singInToStore.fetchRecipes({
      identifier: login,
      password,
    });
    runInAction(() => {
      const user = this._rootStore.singInToStore.cleanSingInToUser;
      const token = user?.jwt ?? null;
      this.username = user?.user.username;
      if (token) this._rootStore.setToken(token, user?.user.username);
    });
  }

  exit = () => {
    this._rootStore.clearToken();
    this.username = undefined;
  };

  get userName(): string | undefined | null {
    return this.username;
  }

  get isError(): boolean {
    return typeof this._rootStore.singInToStore.cleanSingInToError == "string";
  }

  get hasToken(): boolean {
    return this._rootStore.token !== null;
  }
}

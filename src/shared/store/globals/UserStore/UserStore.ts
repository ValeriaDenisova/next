import { runInAction, makeAutoObservable } from 'mobx';
import type { IRootStore } from '../root/RootStore';

export default class UserStore {
  username: string | undefined = undefined;

  private _rootStore: IRootStore;

  constructor(root: IRootStore) {
    makeAutoObservable(this);
    this._rootStore = root;
  }

  async entrance(login?: string, password?: string) {
    await this._rootStore.singInToStore.fetchRecipes({ identifier: login, password });
    runInAction(() => {
      const user = this._rootStore.singInToStore.cleanSingInToUser;
      const token = user?.jwt ?? null;
      this.username = user?.user.username;
      if (token) this._rootStore.setToken(token);
    });
  }

  exit = () => {
    this._rootStore.clearToken();
    this.username = undefined;
  };


  get userName(): string | undefined {
    return this.username;
  }

  get isError(): boolean {
    return typeof this._rootStore.singInToStore.cleanSingInToError == 'string';
  }
}

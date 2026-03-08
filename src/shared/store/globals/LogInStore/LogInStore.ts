import { makeAutoObservable,  runInAction } from 'mobx';
import { LogInHead } from '@entities/api/LogIn';
import type { IRootStore } from '../root/RootStore';


export default class LogInStore {
    loading: boolean = false;
    error: string | null = null;
    result: boolean = false;

    private _rootStore: IRootStore;
    

    constructor(root: IRootStore) {
       makeAutoObservable(this);
       this._rootStore = root;
    }

    async fetchRecipes(head: LogInHead) {
          runInAction(() => {
            this.loading = true;
            this.error = null;
            this.result= false;
          });

      
          try {
            const response = await this._rootStore.api.request({
              method: 'POST',
              endpoint: '/auth/local/register',
              headers: {},
              data: head,
            });
      
            if (response.success) {
              runInAction(() => {
                this.result = true;
              });
            } else {
              runInAction(() => {
                this.error = `Ошибка: статус ${response.status}`;
              });
            }
          } catch {
            runInAction(() => {
              this.error = 'Ошибка при регистрации';
            });
          } finally {
            runInAction(() => {
              this.loading = false;
            });
          }
        }

        get isResult(): boolean{
            return this.result;
        }
}
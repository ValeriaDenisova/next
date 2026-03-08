import { runInAction, reaction } from 'mobx';
import { rootStore, RootStore } from '@store/globals/root/RootStore';

export default class ScrollStore {
  hasMore: boolean = true;
  isArray: boolean = false;
  load: boolean = false;
  readonly PAGE_SIZE: number = 9;
  readonly BOTTOM: number = 50;
  readonly ARRAY_POSITION = 2500;
  scrollPositionRef: React.RefObject<number>;
  prevScrollTop: number = 0;
  total: number = 0;

  private isScroll: boolean = true;
  private scroll: number = 0;
  private _rootStore: RootStore;

  constructor(scrollPositionRef: React.RefObject<number>) {
    this.scrollPositionRef = scrollPositionRef;
    window.addEventListener('scroll', this.handleScroll);
    this._rootStore = rootStore;

    reaction(
      () => this._rootStore.resipes.getFiltersCategoryParam,
      () => {
        this.scroll = window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
        this.isScroll = false;
        setTimeout(() => {
          this.isScroll = true;
        }, 1000);
      }
    );

    reaction(
      () => this._rootStore.resipes.getSearch,
      () => {
        this.scroll = window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
        this.isScroll = false;
        setTimeout(() => {
          this.isScroll = true;
        }, 1000);
      }
    );
  }

  loadMore = () => {
    if (this.load || !this.hasMore) return;
    if (!this.isScroll) {
      window.scrollTo({ top: this.scroll, left: 0, behavior: 'auto' });
    }

    this.scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;

    this.load = true;
    this._rootStore.resipes.setPageSize(this._rootStore.resipes.getPageSize + this.PAGE_SIZE);

    if (this._rootStore.resipes.getPageSize > this.total && this.total > 0) {
      this.hasMore = false;
    }
    this.loadNew();
  };

  handleScroll = () => {
    runInAction(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > this.prevScrollTop) {
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.offsetHeight;

        if (scrollTop + windowHeight >= fullHeight - this.BOTTOM) {
          this.total =
            this._rootStore.resipes.total && this._rootStore.resipes.total > 0
              ? this._rootStore.resipes.total
              : this.total;
          if (!(this._rootStore.resipes.getPageSize > this.total && this.total > 0)) {
            this.hasMore = true;
          }
          this.loadMore();
        }
      }
      this.prevScrollTop = scrollTop;
    });
  };

  loadNew = () => {
    if (this.load) {
      const timeout = setTimeout(() => {
        this.load = false;
      }, 500);
      return () => clearTimeout(timeout);
    }
  };

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}

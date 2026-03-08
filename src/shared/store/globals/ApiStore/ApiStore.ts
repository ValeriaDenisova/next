import { stringify } from 'qs';
import { HTTPMethod, StatusHTTP } from './types';
import type { ApiResponse, IApiStore, RequestParams } from './types';
import { makeAutoObservable, runInAction } from 'mobx';

type TokenProvider = () => string | null;

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;
  private getToken?: TokenProvider;

  data: unknown = null;
  loading: boolean = false;
  error: string | null = null;
  status: number | null = null;

  constructor(baseUrl: string, tokenProvider?: TokenProvider) {
    this.baseUrl = baseUrl;
    this.getToken = tokenProvider;
    makeAutoObservable(this);
  }

  private _buildHeaders(headers?: Record<string, string>): Record<string, string> {
    const merged = { ...(headers || {}) };
    const token = this.getToken?.();
    if (token) {
      merged['Authorization'] = `Bearer ${token}`;
    }
    return merged;
  }

  private _getRequestDataWithAuth<ReqT>(params: RequestParams<ReqT>): [RequestInfo, RequestInit] {
    let endpoint: RequestInfo = `${this.baseUrl}${params.endpoint}`;
    const headers = this._buildHeaders(params.headers);
    const options: RequestInit = {
      method: params.method,
      headers: { ...headers },
    };

    if (params.method === HTTPMethod.GET) {
      endpoint = `${endpoint}?${stringify(params.data)}`;
    }

    if (params.method === HTTPMethod.POST) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json;charset=utf-8',
      };
      options.body = JSON.stringify(params.data);
    }

    return [endpoint, options];
  }

  private _getRequestData<ReqT>(params: RequestParams<ReqT>): [RequestInfo, RequestInit] {
    let endpoint: RequestInfo = `${this.baseUrl}${params.endpoint}`;
    const options: RequestInit = {
      method: params.method,
      headers: { ...params.headers },
    };

    if (params.method === HTTPMethod.GET) {
      endpoint = `${endpoint}?${stringify(params.data)}`;
    }

    if (params.method === HTTPMethod.POST) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json;charset=utf-8',
      };
      options.body = JSON.stringify(params.data);
    }

    return [endpoint, options];
  }

  async request<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    this.loading = true;
    this.error = null;
    try {
      const [endpoint, options] = this._getRequestData(params);
      const response = await fetch(endpoint, options);
      const data = await response.json();

      runInAction(() => {
        this.loading = false;
        this.data = data;
        this.status = response.status;
      });

      return {
        success: response.ok,
        data,
        status: response.status,
      };
    } catch {
      runInAction(() => {
        this.loading = false;
        this.error = 'Network or parsing error';
        this.status = StatusHTTP.UNEXPECTED_ERROR;
        this.data = null;
      });
      return {
        success: false,
        data: null,
        status: StatusHTTP.UNEXPECTED_ERROR,
      };
    }
  }

  async requestWithAuth<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    this.loading = true;
    this.error = null;
    try {
      const [endpoint, options] = this._getRequestDataWithAuth(params);
      const response = await fetch(endpoint, options);
      const data = await response.json();

      runInAction(() => {
        this.loading = false;
        this.data = data;
        this.status = response.status;
      });

      return {
        success: response.ok,
        data,
        status: response.status,
      };
    } catch {
      runInAction(() => {
        this.loading = false;
        this.error = 'Network or parsing error';
        this.status = StatusHTTP.UNEXPECTED_ERROR;
        this.data = null;
      });
      return {
        success: false,
        data: null,
        status: StatusHTTP.UNEXPECTED_ERROR,
      };
    }
  }

  reset() {
    this.data = null;
    this.loading = false;
    this.error = null;
    this.status = null;
  }
}


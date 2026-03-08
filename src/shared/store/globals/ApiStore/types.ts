export const HTTPMethod = {
  GET: 'GET',
  POST: 'POST',
} as const;
export type HTTPMethod = (typeof HTTPMethod)[keyof typeof HTTPMethod];

export type RequestParams<ReqT = Record<string, unknown>> = {
  method: HTTPMethod;
  endpoint: string;
  headers?: Record<string, string>;
  data?: ReqT;
};

export const StatusHTTP = {
  status200: 200,
  status201: 201,
  status300: 300,
  status304: 304,
  status400: 400,
  status401: 401,
  status403: 403,
  status404: 404,
  status422: 422,
  UNEXPECTED_ERROR: 520,
} as const;

export type StatusHTTP = number;

export type ApiResponse<SuccessT, ErrorT> =
  | {
      success: true;
      data: SuccessT;
      status: StatusHTTP;
    }
  | {
      success: false;
      data: ErrorT;
      status: StatusHTTP;
    }
  | {
      success: false;
      data: null;
      status: StatusHTTP;
    };

export interface IApiStore {
  readonly baseUrl: string;
  request<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>>;
}

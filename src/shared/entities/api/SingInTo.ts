export interface SingInToHead {
  identifier: string | undefined;
  password: string | undefined;
}

export interface SingInToApi {
  jwt: string;
  user: {
    id: number | string;
    username: string;
    email: string;
  };
}

export interface User {
  id: number | string;
  username: string;
  email: string;
}

export interface SingInTo {
  jwt: string;
  user: User;
}

export const normalizeSingInTo = (from: SingInToApi): SingInTo => {
  return {
    jwt: from.jwt,
    user: from.user,
  };
};

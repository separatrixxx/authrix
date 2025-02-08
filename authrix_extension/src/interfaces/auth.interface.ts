export interface AuthPublicKeyInterface {
    message: string,
    publicKey?: string,
}

export interface AuthUsernameInterface {
    message: string,
    username?: string,
}

export interface AuthStoreInterface {
  isAuthorized: boolean;
  username: string | null;
  publicKeyHash: string | null;
  setAuth: (username: string, publicKeyHash: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

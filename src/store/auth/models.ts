export interface AuthState {
  loggedIn?: boolean;
  user?: User;
}

export interface User {
  email: string;
  username: string;
}

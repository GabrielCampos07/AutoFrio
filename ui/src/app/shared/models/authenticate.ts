import { User } from './user';

export interface Authenticate {
  token: string;
  user: User;
}

export interface AuthenticateLogin {
  email: string;
  password: string;
}

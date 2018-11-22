import {Wallet} from "./wallet";

export class User {
  id: string;
  login: string;
  password: string;
  role: string;
  email: string;
  language: string;
  lastDateLogin: string;
  wallet: Wallet;
  ban: boolean;

  static cloneBase(user: User): User {
    let clonedUser: User = new User();
    clonedUser.id = user.id;
    clonedUser.login = user.login;
    clonedUser.password = user.password;
    clonedUser.role = user.role;
    clonedUser.email = user.email;
    clonedUser.language = user.language;
    clonedUser.lastDateLogin = user.lastDateLogin;
    return clonedUser;
  }
}


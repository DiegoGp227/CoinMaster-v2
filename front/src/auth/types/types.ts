export interface ICredentials {
  email: string;
  password: string;
}

interface IUserInfo {
  username: string;
  email: string;
  currency: string;
  budget_reset_day: number;
}

export interface IResposeAuth {
  menssage: string;
  token: string;
  userInfo: IUserInfo;
}

export interface IUserData {
  username: string;
  email: string;
  password: string;
  currency: string;
}

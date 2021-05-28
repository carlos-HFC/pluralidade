export interface ILogin {
  email: string;
  password: string;
}

export interface IResetPassword {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}
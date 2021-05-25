export type ICreateUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  cpf: string;
  gender: string;
  cep: string;
  address: string;
  number: string;
  district: string;
  city: string;
  uf: string;
  phone: string;
  deficient: boolean;
  whichDeficiency?: string;
  roleId: number;
  courseId?: number;
};

export type IUpdateUser = Partial<ICreateUser> & {
  oldPassword?: string;
};
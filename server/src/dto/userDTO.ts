export interface UserSingupDTO {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserSingupResponseDTO {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface userLoginResponseDTO {
  data: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export interface IFilteredData {
  id: string;
  name: string;
  email: string;
}

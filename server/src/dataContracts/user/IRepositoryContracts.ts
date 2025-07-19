export interface IUserSignupData {
    name:string;
    email:string;
    phone:number;
    password:string;
    confirmPassword:string;
}

export interface IUserSignupDataResponse{
    name:string;
    email:string;
    phone:number;
}

export interface IUserLoginData{
    email:string;
    password:string;
}

export interface INewDetails {
  name: string;
  password: string;
  email: string;
  phone: number ;
  confirmPassword:string;
}


export interface IUserLoginResponse{
    id:string;
    name:string;
    email:string;
    password:string;
}




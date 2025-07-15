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
    phone:Number;
}

export interface IUserLoginData{
    email:string;
    password:string;
}

export interface IUserLoginResponse{
    id:string;
    name:string;
    email:string;
}


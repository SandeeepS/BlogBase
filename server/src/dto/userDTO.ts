export interface UserSingupDTO {
    name:string;
    email:string;
    phone:number;
    password:string;
    confirmPassword:string;
}

export interface UserLoginDTO {
    email:string;
    password:string;
}

export interface UserSingupResponseDTO{
    id:string;
    name:string;
    email:string;
    token:string;
}

export interface userLoginResponseDTO {
   data:IFilteredData | null,
    token:string | null;
}



export interface IFilteredData {
    id:string;
    name:string;
    email:string;
}

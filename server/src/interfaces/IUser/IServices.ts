import { IUserLoginData, IUserLoginResponse, IUserSignupData, IUserSingupResponse } from "../../dataContracts/user/IServiceContracts";

export interface IUserServices {
 
    signup(userSignUpData: IUserSignupData):Promise<IUserSingupResponse | null>
    login(userLoginData:IUserLoginData):Promise<IUserLoginResponse | null>

}


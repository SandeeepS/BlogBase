import { IUserLoginData, IUserLoginResponse, IUserSignupData, IUserSignupDataResponse } from "../../dataContracts/user/IUserDataContracts";

export interface IUserServices {
 
    signup(userSignUpData: IUserSignupData): Promise<IUserSignupDataResponse | null> 
    login(userLoginData:IUserLoginData):Promise<IUserLoginResponse | null>

}


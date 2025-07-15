import { IUserLoginData, IUserLoginResponse, IUserSignupData, IUserSignupDataResponse } from "../../dataContracts/user/IUserDataContracts";

export interface IRepository {

    signup(userSignUpData: IUserSignupData): Promise<IUserSignupDataResponse> 
    login(userLoginData:IUserLoginData):Promise<IUserLoginResponse | null>
    

}
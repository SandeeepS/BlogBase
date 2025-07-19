import { IUserLoginData, IUserLoginResponse, IUserSignupData, IUserSignupDataResponse } from "../../dataContracts/user/IRepositoryContracts"

export interface IRepository {

    signup(userSignUpData: IUserSignupData): Promise<IUserSignupDataResponse> 
    login(userLoginData:IUserLoginData):Promise<IUserLoginResponse | null>
    

}
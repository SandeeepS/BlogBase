import { IisEmailExist, IUserLoginData, IUserLoginResponse, IUserSignupData, IUserSignupDataResponse } from "../../dataContracts/user/IRepositoryContracts"

export interface IRepository {

    signup(userSignUpData: IUserSignupData): Promise<IUserSignupDataResponse | null> 
    login(userLoginData:IUserLoginData):Promise<IUserLoginResponse | null>
    isEmailExist(data: IisEmailExist): Promise<boolean>
    

}
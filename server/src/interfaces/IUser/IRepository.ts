import { IisEmailExist, IUserLoginData, IUserLoginResponse, IUserSignupData, IUserSignupResponse,  } from "../../dataContracts/user/IRepositoryContracts"

export interface IRepository {

    signup(userSignUpData: IUserSignupData): Promise<IUserSignupResponse | null> 
    login(userLoginData:IUserLoginData):Promise<IUserLoginResponse | null>
    isEmailExist(data: IisEmailExist): Promise<boolean>
    

}
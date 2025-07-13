import { IUserSignupData, IUserSignupDataResponse } from "../../dataContracts/user/IUserDataContracts";

export interface IRepository {

    signup(userSignUpData: IUserSignupData): Promise<IUserSignupDataResponse> 
    

}
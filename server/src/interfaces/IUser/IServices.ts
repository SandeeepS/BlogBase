import { IUserSignupData, IUserSignupDataResponse } from "../../dataContracts/user/IUserDataContracts";

export interface IUserServices {
 
    signup(userSignUpData: IUserSignupData): Promise<IUserSignupDataResponse> 
    
}


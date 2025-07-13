import {
  IUserSignupData,
  IUserSignupDataResponse,
} from "../dataContracts/user/IUserDataContracts";
import { IRepository } from "../interfaces/IUser/IRepository";
import { IUserServices } from "../interfaces/IUser/IServices";

class UserService implements IUserServices {
  constructor(private _userRepository: IRepository) {}
  async signup(
    userSignUpData: IUserSignupData
  ): Promise<IUserSignupDataResponse> {
    try {
      console.log("Reached in the UserService for userSignup");
      console.log("userDeatails in the userService is",userSignUpData);
      const response = await this._userRepository.signup(userSignUpData);
      return userSignUpData;
    } catch (error) {
      console.log(
        "Error occured in the userService in the signup function",
        error
      );
      throw error;
    }
  }
}

export default UserService;

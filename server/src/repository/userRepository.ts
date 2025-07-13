import {
  IUserSignupData,
  IUserSignupDataResponse,
} from "../dataContracts/user/IUserDataContracts";
import { IRepository } from "../interfaces/IUser/IRepository";
import { UserInterface } from "../interfaces/Model/IUser";
import userModel from "../model/userModel";
import { BaseRepository } from "./BaseRepository/baseRepository";

export class UserRepository
  extends BaseRepository<UserInterface>
  implements IRepository
{
  constructor() {
    super(userModel);
  }
  async signup(
    userSignUpData: IUserSignupData
  ): Promise<IUserSignupDataResponse> {
    try {
      console.log("Reached in the UserRepository for userSignup");
      console.log("UserDetails in the userRepository ", userSignUpData);
      const response = await this.save(userSignUpData);
      if (response) {
        console.log("userData saved sucessfully", response);
      } else {
        console.log("Failed to save the userData");
      }
      return userSignUpData;
    } catch (error) {
      console.log(
        "Error occured in the userRepository in the signup function",
        error
      );
      throw error;
    }
  }
}

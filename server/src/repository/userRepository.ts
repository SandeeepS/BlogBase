import {
  IisEmailExist,
  IUserLoginData,
  IUserLoginResponse,
  IUserSignupData,
  IUserSignupDataResponse,
} from "../dataContracts/user/IRepositoryContracts";
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

  //function to login
  async login(
    userLoginData: IUserLoginData
  ): Promise<IUserLoginResponse | null> {
    try {
      const { email } = userLoginData;
      const query = { email: email };
      const response = await this.find(query);
      if (!response) {
        return null;
      }
      const { _id, name, email: userEmail, password } = response;
      const userLoginResponse: IUserLoginResponse = {
        id: _id.toString(),
        name,
        email: userEmail,
        password,
      };
      console.log(
        "Userd details fetched in hte userRepository while login",
        response
      );
      return userLoginResponse;
    } catch (error) {
      console.log(
        "Error occured while login in the loging funtion in the userRepository.ts"
      );
      throw error;
    }
  }

  //function to check the user email is exist or not
  async isEmailExist(data: IisEmailExist): Promise<boolean> {
    try {
      const { email } = data;
      console.log("email find in userRepsoi", email);
      const response = await this.findOne({ email: email });
      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(
        "error occured in the isEmailExit function in userRepository"
      );
      throw error;
    }
  }
}

import Cryptr from "cryptr";

import { IRepository } from "../interfaces/IUser/IRepository";
import { IUserServices } from "../interfaces/IUser/IServices";
import { LoginValidation, SignUpValidation } from "../utils/validator";
import { IEncrypt } from "../utils/encrypt";
import { ICreateJWT } from "../utils/generateTokens";
import {
  INewDetails,
  IUserLoginData,
  IUserLoginResponse,
  IUserSignupData,
  IUserSingupResponse,
} from "../dataContracts/user/IServiceContracts";

class UserService implements IUserServices {
  constructor(
    private _userRepository: IRepository,
    private _encrypt: IEncrypt,
    private _createJWT: ICreateJWT
  ) {}
  async signup(
    userSignUpData: IUserSignupData
  ): Promise<IUserSingupResponse> {
    try {
      const { name, password, email, phone, confirmPassword } = userSignUpData;
      const isValidUserSingupData = SignUpValidation(
        name,
        phone.toString(),
        email,
        password,
        confirmPassword
      );

      if (!isValidUserSingupData) {
        return {
          success: false,
          message: "user details provided is not valid",
        };
      }

      const secret_key: string | undefined = process.env.CRYPTR_SECRET;
      if (!secret_key) {
        console.log("Sercret is not found in the userService while singup");
        return {
          success: false,
          message: "user details provided is not valid",
        };
      }

      const isUserExist = await this._userRepository.isEmailExist({ email });
      if (isUserExist) {
        console.log("user Already exist");
        return {
          success: false,
          message: "user Already exist",
        };
      }

      const cryptr = new Cryptr(secret_key, {
        encoding: "base64",
        pbkdf2Iterations: 10000,
        saltLength: 10,
      });
      const newPassword = cryptr.encrypt(password);
      const newDetails: INewDetails = {
        name: name,
        password: newPassword,
        email: email,
        phone: phone,
        confirmPassword: confirmPassword,
      };

      const response = await this._userRepository.signup(newDetails);
      const token = this._createJWT.generateToken(response.id);
      console.log(response);
      return {
        success: true,
        message: "user singup successfull",
        data: response,
        token:token
      };
    } catch (error) {
      console.log(
        "Error occured in the userService in the signup function",
        error
      );
      throw error;
    }
  }



  async login(
    userLoginData: IUserLoginData
  ): Promise<IUserLoginResponse>{
    try {
      const { email, password } = userLoginData;

      const isValid = LoginValidation(email, password);
      if (!isValid) {
        return {
          success: false,
          message: "Invalid login credentials",
        };
      }

      const response = await this._userRepository.login(userLoginData);
      if (!response) {
        return {
          success: false,
          message: "User not found",
        };
      }

      const isPasswordMatch = await this._encrypt.compare(
        password,
        response.password
      );
      if (!isPasswordMatch) {
        return {
          success: false,
          message: "Incorrect password",
        };
      }

      const token = this._createJWT.generateToken(response._id.toString());
      return {
        success: true,
        message: "Login successful",
        data: response,
        token,
      };
    } catch (error) {
      console.log("Error in login:", error);
      throw error;
    }
  }
}
export default UserService;

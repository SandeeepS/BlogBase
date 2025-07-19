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
  IUserSignupDataResponse,
} from "../dataContracts/user/IServiceContracts";

class UserService implements IUserServices {
  constructor(
    private _userRepository: IRepository,
    private _encrypt: IEncrypt,
    private _createJWT: ICreateJWT
  ) {}
  async signup(
    userSignUpData: IUserSignupData
  ): Promise<IUserSignupDataResponse | null> {
    try {
      const { name, password, email, phone, confirmPassword } = userSignUpData;
      const isValidUserSingupData = SignUpValidation(name,phone.toString(),email,password,confirmPassword);
      
      if(!isValidUserSingupData){
        throw new Error("Invalid User Data!!");
      }

      const secret_key: string | undefined = process.env.CRYPTR_SECRET;
      if (!secret_key) {
        throw new Error(
          "Encrption secret key is not defined in the environment"
        );
      }
     
      const isUserExist = await this._userRepository.isEmailExist({email});
      if(isUserExist){
        throw new Error("Email already exist");
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
      console.log(response);
      return userSignUpData;
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
  ): Promise<IUserLoginResponse | null> {
    try {
      const { email, password } = userLoginData;
      const loginValidation = LoginValidation(email, password);
      if (loginValidation) {
        const response = await this._userRepository.login(userLoginData);
        if (response) {
          const encrypedPassword = response.password;
          console.log("password from the response is ", encrypedPassword);
          const isPasswordMatch = await this._encrypt.compare(
            password,
            encrypedPassword
          );
          if (isPasswordMatch) {
            const userId = response.id;
            const token = this._createJWT.generateToken(userId);
            const filteredData = {
              id: response.id,
              name: response.name,
              email: response.email,
            };
            const responseData = {
              data: filteredData,
              token: token,
            };
            return responseData;
          }
        } else {
          return null;
        }
        return null;
      } else {
        return null;
      }
    } catch (error) {
      console.log(
        "Error occured while login in the loging funtion in the userService.ts"
      );
      throw error;
    }
  }
}

export default UserService;

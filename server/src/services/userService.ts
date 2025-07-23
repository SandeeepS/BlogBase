import Cryptr from "cryptr";

import { IRepository } from "../interfaces/IUser/IRepository";
import { IUserServices } from "../interfaces/IUser/IServices";
import { LoginValidation, SignUpValidation } from "../utils/validator";
import { IEncrypt } from "../utils/encrypt";
import { ICreateJWT } from "../utils/generateTokens";
import {
  ICreatePostData,
  ICreatePostDataResponse,
  IDeleteBlogData,
  IDeleteBlogDataResponse,
  IGetAllBlogsResponse,
  IGetPostsByBlogId,
  IGetPostsByBlogIdResponse,
  IGetPostsByUserId,
  IGetPostsByUserIdResponse,
  INewDetails,
  IUpadatePostData,
  IUpdatePostResponse,
  IUserLoginData,
  IUserLoginResponse,
  IUserSignupData,
  IUserSingupResponse,
} from "../dataContracts/user/IServiceContracts";
import { IBlogs } from "../interfaces/IBlog/IRepository";

class UserService implements IUserServices {
  constructor(
    private _userRepository: IRepository,
    private _encrypt: IEncrypt,
    private _createJWT: ICreateJWT,
    private _blogRepository: IBlogs
  ) {}
  async signup(userSignUpData: IUserSignupData): Promise<IUserSingupResponse> {
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
      if (response) {
        const id = response._id.toString();
        const token = this._createJWT.generateToken(id);
        console.log(response);
        return {
          success: true,
          message: "user singup successfull",
          data: response,
          token: token,
        };
      } else {
        return {
          success: true,
          message: "user singup successfull",
          data: null,
        };
      }
    } catch (error) {
      console.log(
        "Error occured in the userService in the signup function",
        error
      );
      throw error;
    }
  }

  async login(userLoginData: IUserLoginData): Promise<IUserLoginResponse> {
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

  async createPost(data: ICreatePostData): Promise<ICreatePostDataResponse> {
    try {
      console.log(data);
      const response = await this._blogRepository.createPost(data);
      if (response) {
        return {
          success: true,
          message: "blog created successfully",
          data: response,
        };
      } else {
        return {
          success: true,
          message: "blog creation failed",
          data: null,
        };
      }
    } catch (error) {
      console.log(
        "error occured while creating post in the userService creatpost funciton ",
        error
      );
      throw error;
    }
  }

  async getAllPosts(): Promise<IGetAllBlogsResponse> {
    try {
      const response = await this._blogRepository.getAllPosts();
      console.log(response);
      if (response) {
        return {
          success: true,
          message: "data fetched successfully",
          data: response,
        };
      } else {
        return {
          success: false,
          message: "data feching failed ",
          data: null,
        };
      }
    } catch (error) {
      console.log(
        "error occured while creating post in the userService creatpost funciton ",
        error
      );
      throw error;
    }
  }

  async getPostsByUserId(
    data: IGetPostsByUserId
  ): Promise<IGetPostsByUserIdResponse> {
    try {
      const response = await this._blogRepository.getPostsByUserId(data);
      console.log(response);
      if (response) {
        return {
          success: true,
          message: "data fetched successfully",
          data: response,
        };
      } else {
        return {
          success: false,
          message: "data feching failed ",
          data: null,
        };
      }
    } catch (error) {
      console.log(
        "error occured while getting the user posts by id  in the userService getPostsByUserId funciton ",
        error
      );
      throw error;
    }
  }

  async getPostsByBlogId(
    data: IGetPostsByBlogId
  ): Promise<IGetPostsByBlogIdResponse> {
    try {
      const response = await this._blogRepository.getPostsByBlogId(data);
      console.log(response);
      if (response) {
        return {
          success: true,
          message: "data fetched successfully",
          data: response,
        };
      } else {
        return {
          success: false,
          message: "data feching failed ",
          data: null,
        };
      }
    } catch (error) {
      console.log(
        "error occured while getting the user posts by id  in the userService getPostsByUserId funciton ",
        error
      );
      throw error;
    }
  }

  async updatePost(data: IUpadatePostData): Promise<IUpdatePostResponse> {
    try {
      const response = await this._blogRepository.updatePost(data);
      console.log(response);
      if (response) {
        return {
          success: true,
          message: "data fetched successfully",
          data: response,
        };
      } else {
        return {
          success: false,
          message: "data feching failed ",
          data: null,
        };
      }
    } catch (error) {
      console.log(
        "error occured while updating  the user posts by id  in the userService updatePost funciton ",
        error
      );
      throw error;
    }
  }


    async deleteBlog(data: IDeleteBlogData): Promise<IDeleteBlogDataResponse> {
    try {
      const response = await this._blogRepository.deleteBlog(data);
      console.log(response);
      if (response) {
        return {
          success: true,
          message: "data fetched successfully",
          data: response,
        };
      } else {
        return {
          success: false,
          message: "data feching failed",
          data: null,
        };
      }
    } catch (error) {
      console.log(
        "error occured while deleting blog  by blogId  in the userService deleteBlog funciton ",
        error
      );
      throw error;
    }
  }
}
export default UserService;

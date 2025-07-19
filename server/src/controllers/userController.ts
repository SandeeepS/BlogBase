import { NextFunction, Request, Response } from "express";
import { IUserController } from "../interfaces/IUser/IController";
import { IUserServices } from "../interfaces/IUser/IServices";
import { createSuccessResponse } from "../helpers/responseHelper";
import {
  UserLoginDTO,
  userLoginResponseDTO,
  UserSingupDTO,
  UserSingupResponseDTO,
} from "../dto/userDTO";

class userController implements IUserController {
  constructor(private _userService: IUserServices) {}
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("Reached in the userController");
      console.log(req.body);
      const { name, email, password, phone, confirmPassword }: UserSingupDTO =
        req.body;
      console.log(
        "data from the req.body is ",
        name,
        " ",
        email,
        " ",
        password,
        " ",
        confirmPassword
      );
      const response = await this._userService.signup({
        name,
        email,
        phone,
        password,
        confirmPassword,
      });
      const sigupResponse: UserSingupResponseDTO = {
        id: response.id,
        name: response.name,
        email: response.email,
        token: "sdfsdfsdfsd",
      };
      res.status(200).json(createSuccessResponse({ sigupResponse }));
    } catch (error) {
      console.log(
        "error occured in the singup function in the userController",
        error
      );
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password }: UserLoginDTO = req.body;
      console.log("email and password from the req.body is ", email, password);
      const response = await this._userService.login({ email, password });
      console.log(
        "response reached in the user controller with token is",
        response
      );
      if (response) {
        const loginResponse: userLoginResponseDTO = {
          data: response.data,
          token: response.token,
        };
        res.status(200).json(createSuccessResponse({ loginResponse }));
      } else {
        const loginResponse: userLoginResponseDTO = {
          data: null,
          token: null,
        };
        res.status(200).json(createSuccessResponse({loginResponse}));
      }
    } catch (error) {
      console.log("error occured while login the user in the userController");
      next(error);
    }
  }
}

export default userController;

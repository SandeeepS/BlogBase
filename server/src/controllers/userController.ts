import { NextFunction, Request, Response } from "express";
import { IUserController } from "../interfaces/IUser/IController";
import { IUserServices } from "../interfaces/IUser/IServices";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../helpers/responseHelper";
import { UserLoginDTO, UserSingupDTO } from "../dto/userDTO";
import {
  mapToLoginResponseDTO,
  mapToSignupResponseDTO,
} from "../mappers/userMapper";
import { UserInterface } from "../interfaces/Model/IUser";

class userController implements IUserController {
  constructor(private _userService: IUserServices) {}
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("Reached in the userController");
      console.log(req.body);
      const { name, email, password, phone, confirmPassword }: UserSingupDTO =
        req.body;
      const response = await this._userService.signup({
        name,
        email,
        phone,
        password,
        confirmPassword,
      });

      if (response && response.data) {
        const signupResponse = mapToSignupResponseDTO(
          response.data as UserInterface,
          response.token as string
        );
        res.status(200).json(createSuccessResponse({ signupResponse }));
      } else {
        const signupResponse = null;
        res.status(200).json(createSuccessResponse(signupResponse));
      }
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
      if (response && response.data) {
        const loginResponse = mapToLoginResponseDTO(
          response.data as UserInterface,
          response.token as string
        );
        res.status(200).json(createSuccessResponse({ loginResponse }));
      } else {
        const loginResponse = null;
        res.status(200).json(createSuccessResponse(loginResponse));
      }
    } catch (error) {
      console.log("error occured while login the user in the userController");
      next(error);
    }
  }

  async createPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, description, image, userId } = req.body;
      console.log(
        "title adn description is in controller  ",
        title,
        description,
        image,
        userId
      );
      const response = await this._userService.createPost({
        title,
        description,
        image,
        userId,
      });
      if (response.success) {
        res.status(200).json(createSuccessResponse(response));
      } else {
        res
          .status(200)
          .json(createErrorResponse("false", "Blog Creation falied "));
      }
    } catch (error) {
      console.log("error occured while login the user in the userController");
      next(error);
    }
  }

  async getAllPosts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this._userService.getAllPosts();
      if (response.success) {
        res.status(200).json(createSuccessResponse(response.data));
      } else {
        res
          .status(200)
          .json(createErrorResponse("false", "fetching blogs failed "));
      }
    } catch (error) {
      console.log("error occured while getting all posts ", error);
      next(error);
    }
  }

  async getPostsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let { userId } = req.query;
      console.log("user id is ", userId);
      if (userId) {
        userId = userId.toString();
        const response = await this._userService.getPostsByUserId({ userId });
        res.status(200).json(createSuccessResponse(response));
      } else {
        res
          .status(200)
          .json(createErrorResponse("false", "userId is not found"));
      }
    } catch (error) {
      console.log(
        "error occured while gettin the user posts by id in the usercontroller ",
        error
      );
      next(error);
    }
  }

  async getPostByBlogId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let { blogId } = req.query;
      console.log("blog id is ", blogId);
      if (blogId) {
        blogId = blogId.toString();
        const response = await this._userService.getPostsByBlogId({ blogId });
        res.status(200).json(createSuccessResponse(response));
      } else {
        res
          .status(200)
          .json(createErrorResponse("false", "userId is not found"));
      }
    } catch (error) {
      console.log(
        "error occured while gettin the user posts by blogid  in the usercontroller in the getPostByBlogId ",
        error
      );
      next(error);
    }
  }

  async updatePost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { blogId, updateData } = req.body;
      console.log("blog id is ", blogId, updateData);
      const response = await this._userService.updatePost({blogId,updateData});
      if(response.success){
        res.status(200).json(createSuccessResponse(response));
      }else{
        res.status(200).json(createErrorResponse("false","failed to update the blog"));
      }
    } catch (error) {
      console.log(
        "error occured while updating  the user posts by blogid  in the usercontroller in the updatePost",
        error
      );
      next(error);
    }
  }

  
  async deleteBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { blogId} = req.body;
      console.log("blog id is ", blogId);
      const response = await this._userService.deleteBlog({blogId});
      if(response.success){
        res.status(200).json(createSuccessResponse(response));
      }else{
        res.status(200).json(createErrorResponse("false","failed to delete the blog"));
      }
    } catch (error) {
      console.log(
        "error occured while deleting  the user blog  by blogid  in the usercontroller in the deleteBlog",
        error
      );
      next(error);
    }
  }
}

export default userController;

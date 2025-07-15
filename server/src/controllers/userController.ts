import { NextFunction,Request,Response} from "express";
import { IUserController } from "../interfaces/IUser/IController";
import { IUserServices } from "../interfaces/IUser/IServices";

class userController implements IUserController {
    constructor(private _userService : IUserServices){}
      async signup(req:Request,res:Response,next:NextFunction):Promise<void>{
         try{
            console.log("Reached in the userController");
            console.log(req.body);
            const {name,email,password,phone,confirmPassword} = req.body;
            console.log("data from the req.body is ",name, " " , email, " ", password, " ", confirmPassword);
            const response = await this._userService.signup({name,email,phone,password,confirmPassword});

         }catch(error){
            console.log("error occured in the singup function in the userController",error);
            next(error);
         }
      }

      async login(req:Request,res:Response,next:NextFunction):Promise<void> {
        try{
            const {email,password} = req.body;
            console.log("email and password from the req.body is ",email,password);
            
        }catch(error){
            console.log("error occured while login the user in the userController");
            next(error);
        }
      }


}

export default userController;
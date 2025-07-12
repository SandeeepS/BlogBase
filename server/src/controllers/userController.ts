import { NextFunction,Request,Response} from "express";
import { IUserController } from "../interfaces/IController";

class userController implements IUserController {
      async signup(req:Request,res:Response,next:NextFunction):Promise<void>{
         try{
            console.log("Reached in the userController");
            console.log(req.body);
            const {name,email,password,confirmPassword} = req.body;
            console.log("data from the req.body is ",name, " " , email, " ", password, " ", confirmPassword);
            
         }catch(error){
            console.log("error occured in the singup function in the userController",error);
            next(error);
         }
      }

}

export default userController;
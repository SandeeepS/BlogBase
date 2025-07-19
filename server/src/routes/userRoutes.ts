import  express,{Router,Request,Response,NextFunction}  from "express";
import userController from "../controllers/userController";
import UserService from "../services/userService";
import { UserRepository } from "../repository/userRepository";
import Encrypt from "../utils/encrypt";
import { CreateJWT } from "../utils/generateTokens";



const userRouter:Router = express.Router();
const userRepository = new UserRepository();
const encrypt = new Encrypt();
const createJWT = new CreateJWT();
const userService = new UserService(userRepository,encrypt,createJWT);
const controller = new userController(userService);

userRouter.post("/signup",async(req:Request,res:Response,next:NextFunction) => await controller.signup(req,res,next));
userRouter.post("/login",async(req:Request,res:Response,next:NextFunction) => await controller.login(req,res,next));


export default userRouter
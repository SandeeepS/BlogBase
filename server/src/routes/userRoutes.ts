import  express,{Router,Request,Response,NextFunction}  from "express";
import userController from "../controllers/userController";



const userRouter:Router = express.Router();
const controller = new userController();

userRouter.post("/signup",async(req:Request,res:Response,next:NextFunction) => await controller.signup(req,res,next));


export default userRouter
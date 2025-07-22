import { NextFunction, Request, Response } from "express";

export interface IUserController{
    login(req:Request,res:Response,next:NextFunction):Promise<void> 
    getPostsByUserId (req:Request,res:Response,next:NextFunction) : Promise<void>
    getAllPosts (req:Request,res:Response,next:NextFunction) :Promise<void>
    createPost(req: Request,res: Response,next: NextFunction): Promise<void> 
}
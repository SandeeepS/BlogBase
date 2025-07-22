import mongoose from "mongoose";
import {
  ICreatePostData,
  ICreatePostDateResponse,
  IGetAllBlogsResponse,
} from "../dataContracts/blog/IRespositoryContracts";
import { IBlogs } from "../interfaces/IBlog/IRepository";
import { BlogInterface } from "../interfaces/Model/IBlog";
import blogModel from "../model/blogModel";
import { BaseRepository } from "./BaseRepository/baseRepository";

export class BlogRepository
  extends BaseRepository<BlogInterface>
  implements IBlogs
{
  constructor() {
    super(blogModel);
  }

  async createPost(
    data: ICreatePostData
  ): Promise<ICreatePostDateResponse | null> {
    try {
      console.log(data);
      const convertedUserId = new mongoose.Types.ObjectId(data.userId);
      const query = {
        title: data.title,
        description: data.description,
        image: data.image,
        userId:convertedUserId
      };
      const response = await this.save(query);
      console.log("response after adding blog in the data base ", response);
      return response;
    } catch (error) {
      console.log(
        "error occured while creating post in the blogRepository creatpost funciton ",
        error
      );
      throw error;
    }
  }

  async getAllPosts(): Promise<IGetAllBlogsResponse[]> {
    try {
         const response = await blogModel.aggregate([
      {
        $lookup: {
          from: "users",        
          localField: "userId",  
          foreignField: "_id",   
          as: "userDetails"      
        }
      },
      {
        $unwind: "$userDetails"
      }
    ]);
      return response;
    } catch (error) {
      console.log(
        "error occured while creating post in the userService creatpost funciton ",
        error
      );
      throw error;
    }
  }
}

import mongoose from "mongoose";
import {
  ICreatePostData,
  ICreatePostDateResponse,
  IGetAllBlogsResponse,
  IGetPostsByblogdResponse,
  IGetPostsByBlogId,
  IGetPostsByUserId,
  IGetPostsByUserIdResponse,
  IUpadatePostData,
  IUpdatePostResponse,
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

async getPostsByUserId(data: IGetPostsByUserId): Promise<IGetPostsByUserIdResponse[] | null> {
  try {
    console.log("usersis sfsdfd",data.userId)
    const userObjectId = new mongoose.Types.ObjectId(data.userId);
    const response = await blogModel.aggregate([
      {
        $match: {
          userId: userObjectId
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
    ]);
    console.log("details in the kjgbjkdfiadsfi",response)
    return response;
  } catch (error) {
    console.log(
      "Error occurred while getting the posts by userId in getPostsByUserId function:",
      error
    );
    throw error;
  }
}

async getPostsByBlogId(data: IGetPostsByBlogId): Promise<IGetPostsByblogdResponse | null> {
  try {
    const blogObjectId = new mongoose.Types.ObjectId(data.blogId);
    const response = await blogModel.findById(blogObjectId)
    console.log("details of the blog accessed by id",response)
    return response;
  } catch (error) {
    console.log(
      "Error occurred while getting the posts by blogId in getPostsByUserId function in the blogRepository",
      error
    );
    throw error;
  }
}



async updatePost(data: IUpadatePostData): Promise<IUpdatePostResponse | null> {
  try {
    const blogObjectId = new mongoose.Types.ObjectId(data.blogId);
    const response = await blogModel.findByIdAndUpdate({_id:blogObjectId},{$set:{title:data.updateData.title,description:data.updateData.description,image:data.updateData.image}});
    console.log("details of the blog accessed by id",response)
    return response;
  } catch (error) {
    console.log(
      "Error occurred while getting the posts by blogId in getPostsByUserId function in the blogRepository",
      error
    );
    throw error;
  }
}

}

import {
  ICreatePostData,
  ICreatePostDateResponse,
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
      const query = { title: data.title, description: data.description };
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
}

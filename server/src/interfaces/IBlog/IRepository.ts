import { ICreatePostData, ICreatePostDateResponse, IGetAllBlogsResponse } from "../../dataContracts/blog/IRespositoryContracts";


export interface IBlogs {
     createPost(data: ICreatePostData): Promise<ICreatePostDateResponse | null> 
     getAllPosts(): Promise<IGetAllBlogsResponse[]>
}
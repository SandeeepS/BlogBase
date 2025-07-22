import { ICreatePostData, ICreatePostDateResponse } from "../../dataContracts/blog/IRespositoryContracts";


export interface IBlogs {
     createPost(data: ICreatePostData): Promise<ICreatePostDateResponse | null> 
}
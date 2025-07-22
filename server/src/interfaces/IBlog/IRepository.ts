import { ICreatePostData, ICreatePostDateResponse, IGetAllBlogsResponse, IGetPostsByblogdResponse, IGetPostsByBlogId, IGetPostsByUserId, IGetPostsByUserIdResponse, IUpadatePostData, IUpdatePostResponse } from "../../dataContracts/blog/IRespositoryContracts";


export interface IBlogs {
    createPost(data: ICreatePostData): Promise<ICreatePostDateResponse | null> 
    getAllPosts(): Promise<IGetAllBlogsResponse[]>
    getPostsByUserId(data:IGetPostsByUserId): Promise<IGetPostsByUserIdResponse[] | null>
    getPostsByBlogId(data: IGetPostsByBlogId): Promise<IGetPostsByblogdResponse| null>
    updatePost(data: IUpadatePostData): Promise<IUpdatePostResponse | null>
}
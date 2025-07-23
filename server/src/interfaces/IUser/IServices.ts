import { ICreatePostData, ICreatePostDataResponse, IDeleteBlogData, IDeleteBlogDataResponse, IGetAllBlogsResponse, IGetPostsByBlogId, IGetPostsByBlogIdResponse, IGetPostsByUserId, IGetPostsByUserIdResponse, IUpadatePostData, IUpdatePostResponse, IUserLoginData, IUserLoginResponse, IUserSignupData, IUserSingupResponse } from "../../dataContracts/user/IServiceContracts";

export interface IUserServices {
 
    signup(userSignUpData: IUserSignupData):Promise<IUserSingupResponse | null>
    login(userLoginData:IUserLoginData):Promise<IUserLoginResponse | null>
    createPost(data: ICreatePostData): Promise<ICreatePostDataResponse> 
    getAllPosts(): Promise<IGetAllBlogsResponse>
    getPostsByUserId(data:IGetPostsByUserId): Promise<IGetPostsByUserIdResponse>
    getPostsByBlogId(data:IGetPostsByBlogId): Promise<IGetPostsByBlogIdResponse> 
    updatePost(data: IUpadatePostData): Promise<IUpdatePostResponse> 
    deleteBlog(data: IDeleteBlogData): Promise<IDeleteBlogDataResponse> 

}


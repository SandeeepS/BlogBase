import type { ICreatePost, IUpdateData } from "../interfaces/IDataInterface";
import Api from "../services/axios";
import userRoutes from "../services/EndPoints/userEndPoints";

export const login = async (email: string, password: string) => {
  try {
    const response = await Api.post(userRoutes.login, { email, password });
    return response;
  } catch (error) {
    console.log("Error from the login form the user.ts", error as Error);
    throw error;
  }
};

export const signup = async (name:string,email:string,phone:number,password:string,confirmPassword:string)=> {
    try{
        const response = await Api.post(userRoutes.signup,{name,email,password,phone,confirmPassword});
        return response;
    }catch(error){
        console.log("Error from the singup from the user.ts",error);
        throw error
    }
}


export const createPost = async(data:ICreatePost) => {
  try{
    const response = await Api.post(userRoutes.createPost,data);
    return response;
  }catch(error){
    console.log("error occured while creating post in the user.ts");
    throw error
  }
}

export const getAllPost = async() => {
  try{
    const response = await Api.get(userRoutes.getAllPosts);
    console.log("response in use.ts ");
    return response;
  }catch(error){
    console.log("error occured while fetching all the blogs in the getAllPost",error);
    throw error;
  }
}

export const getPostByUserId = async (userId:string) => {
  try{
    const response = await Api.get(userRoutes.getPostByUserId,{params:{userId}});
    return response;
  }catch(error){
    console.log("error occured while getting user posts by userid ",error);
    throw error;
  }
}

export const getPostByBlogId = async (blogId:string) => {
  try{
    console.log("reached here",blogId);
    const response = await Api.get(userRoutes.getPostByBlogId,{params:{blogId}});
    return response;
  }catch(error){
    console.log("error while getting the post by blog id ",error);
    throw error;
  }
} 

export const updatePost = async (blogId:string,updateData:IUpdateData) => {
  try{
    console.log("reached here",blogId,updateData);
    const response = await Api.put(userRoutes.updatePost,{blogId,updateData});
    return response;
  }catch(error){
    console.log("error while updating the post by blog id in updatePost ",error);
    throw error;
  }
} 




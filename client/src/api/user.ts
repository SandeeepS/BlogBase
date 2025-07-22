import type { ICreatePost } from "../interfaces/IDataInterface";
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



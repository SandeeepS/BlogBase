import mongoose from "mongoose";

export interface IUserSignupData {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
}

export interface IUserSingupResponse {
  success: boolean;
  message: string;
  data?: IUserSignupDataResponse | null;
  token?: string;
}

export interface IUserSignupDataResponse {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: number;
  password: string;
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export interface ICreatePostData {
  title: string;
  description: string;
  image: string;
  userId: string;
}

export interface ICreatePostDataResponse {
  success: boolean;
  message: string;
  data: {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    image: string;
    userId: mongoose.Types.ObjectId;
  } | null;
}

export interface IGetAllBlogsResponse {
  success: boolean;
  message: string;
  data:
    | {
        _id: mongoose.Types.ObjectId;
        title: string;
        description: string;
        image: string;
        userId: mongoose.Types.ObjectId;
      }[]
    | null;
}

export interface IGetPostsByUserIdResponse {
  success: boolean;
  message: string;
  data:
    | {
        _id: mongoose.Types.ObjectId;
        title: string;
        description: string;
        image: string;
        userId: mongoose.Types.ObjectId;
      }[]
    | null;
}

export interface IGetPostsByBlogIdResponse {
  success: boolean;
  message: string;
  data: {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    image: string;
    userId: mongoose.Types.ObjectId;
  } | null;
}

export interface IUpdatePostResponse {
  success: boolean;
  message: string;
  data: {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    image: string;
    userId: mongoose.Types.ObjectId;
  } | null;
}

export interface INewDetails {
  name: string;
  password: string;
  email: string;
  phone: number;
  confirmPassword: string;
}

export interface IUserLoginDataResponse {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: number;
  password: string;
}

export interface IUserLoginResponse {
  success: boolean;
  message: string;
  data?: IUserLoginDataResponse | null;
  token?: string;
}

export interface IGetPostsByUserId {
  userId: string;
}

export interface IGetPostsByBlogId {
  blogId: string;
}

export interface IUpadatePostData {
  blogId: string;
  updateData: {
    title: string;
    description: string;
    image: string;
  };
}

export interface IDeleteBlogData{
  blogId:string;
}

export interface IDeleteBlogDataResponse{
    success: boolean;
  message: string;
  data: {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    image: string;
    userId: mongoose.Types.ObjectId;
    isDeleted:boolean
  } | null;
}

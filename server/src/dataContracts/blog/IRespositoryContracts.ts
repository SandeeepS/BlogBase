import mongoose from "mongoose";

export interface ICreatePostData {
  title: string;
  description: string;
  image: string;
  userId:string;
}

export interface ICreatePostDateResponse {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  userId:mongoose.Types.ObjectId
}

export interface IGetAllBlogsResponse {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  userId:mongoose.Types.ObjectId;
}



import mongoose from "mongoose";

export interface ICreatePostData{
    title:string;
    description:string;
    image:string;
}

export interface ICreatePostDateResponse {
      _id: mongoose.Types.ObjectId;
      title: string;
      description: string;
      image:string;
}
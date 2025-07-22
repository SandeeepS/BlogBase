import mongoose from "mongoose";

export interface ICreatePostData {
  title: string;
  description: string;
  image: string;
  userId: string;
}

export interface ICreatePostDateResponse {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  userId: mongoose.Types.ObjectId;
}

export interface IGetAllBlogsResponse {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  userId: mongoose.Types.ObjectId;
}

export interface IGetPostsByUserId {
  userId: string;
}



export interface IGetPostsByUserIdResponse {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  userId: mongoose.Types.ObjectId;
}

export interface IGetPostsByBlogId {
  blogId: string;
}


export interface IGetPostsByblogdResponse {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  userId: mongoose.Types.ObjectId;
}


export interface IUpadatePostData {
  blogId: string;
  updateData: {
    title: string;
    description: string;
    image: string;
  };
}



export interface IUpdatePostResponse {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  userId: mongoose.Types.ObjectId;
}
import mongoose from "mongoose";

export interface IUserSignupData {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
}

export interface IUserSignupResponse {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  email: string;
  phone: number;
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IisEmailExist {
  email: string;
}

export interface INewDetails {
  name: string;
  password: string;
  email: string;
  phone: number;
  confirmPassword: string;
}

export interface IUserLoginResponse {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  email: string;
  phone: number;
}

export interface ICreatePostData {
  title: string;
  description: string;
}

export interface ICreatePostDataResponse {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
}

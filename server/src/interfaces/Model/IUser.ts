import mongoose, { Document } from "mongoose";

export interface UserInterface extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  email: string;
  phone: number;
  isDeleted:boolean
}

import mongoose, { Document } from "mongoose";

export interface BlogInterface extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image:string;
  userId: mongoose.Types.ObjectId;
}


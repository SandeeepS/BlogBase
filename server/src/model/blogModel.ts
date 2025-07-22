import mongoose, { Model, Schema} from "mongoose";
import { BlogInterface } from "../interfaces/Model/IBlog";

const blogSchema: Schema<BlogInterface> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true,
  },
  userId:{
    type: Schema.Types.ObjectId,
    required:true,
  }
});

const blogModel: Model<BlogInterface> = mongoose.model<BlogInterface>(
  "blogs",
  blogSchema
);
export default blogModel;

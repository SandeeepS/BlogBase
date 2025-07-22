import mongoose, { Model, Schema } from "mongoose";
import { UserInterface } from "../interfaces/Model/IUser";

const userSchema: Schema<UserInterface> = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const userModel: Model<UserInterface> = mongoose.model<UserInterface>(
  "user",
  userSchema
);

export default userModel;

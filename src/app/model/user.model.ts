import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

// Schema
const userSchema = new Schema<IUser>(
      {
            firstName: {
                  type: String,
                  required: true,
                  trim: true
            },
            lastName: {
                  type: String,
                  required: true,
                  trim: true
            },
            age: {
                  type: Number,
                  required: true
            },
            email: {
                  type: String,
                  required: true,
                  trim: true
            },
            role: {
                  type: String,
                  enum: ['user', 'admin'],
                  default: 'user'
            }
      },
      {
            versionKey: false,
            timestamps: true
      })
// model
export const User = model("User", userSchema)
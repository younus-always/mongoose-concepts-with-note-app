import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";
import validator from 'validator';

// Sub Schema
const addressSchema = new Schema<IAddress>(
      {
            city: { type: String },
            street: { type: String },
            zip: { type: Number }
      }, {
      _id: false
})

// Schema
const userSchema = new Schema<IUser>(
      {
            firstName: {
                  type: String,
                  required: [true, "firstName is required!"],
                  trim: true,    // custom error msg
                  minlength: [3, "firstName atleast 3 characters"],
                  maxlength: [10, "firstName maximum 10 characters"]
            },
            lastName: {
                  type: String,
                  required: [true, "lastName is required!"],
                  trim: true,
                  minlength: [3, "lastName atleast 3 characters"],
                  maxlength: [10, "lastName maximum 10 characters"]
            },
            age: {
                  type: Number,
                  required: [true, "Age is required!"],
                  min: [18, "Age must be atleast 18, got {VALUE}"],
                  max: [65, "Age must be less than 65, got {VALUE}"]
            },
            email: {
                  type: String,
                  unique: [true, "Email address already exist!"],
                  lowercase: true,
                  required: true,
                  trim: true,
                  // Custom Validator
                  // validate: {
                  //       validator: function (value) {
                  //             return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  //       },
                  //       message: props => `Email ${props.value} is not valid email.`
                  // }
                  // third party library validator package
                  validate: [validator.isEmail, "Invalid email address {VALUE}"]
            },
            password: {
                  type: String,
                  required: true
            },
            role: {
                  type: String,
                  enum: {
                        values: ['user', 'admin'],
                        message: "Role is not valid. got {VALUE}"
                  },
                  default: 'user'
            },
            address: { type: addressSchema }
      },
      {
            versionKey: false,
            timestamps: true
      })
// model
export const User = model("User", userSchema)
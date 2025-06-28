import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethod, UserStaticMethod } from "../interfaces/user.interface";
import validator from 'validator';
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

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
const userSchema = new Schema<IUser, UserStaticMethod, UserInstanceMethod>(
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
            timestamps: true,
            toJSON: { virtuals: true },
            toObject: { virtuals: true }
      })

userSchema.method("hashPassword", async function hashPassword(plainPassword: string) {
      const password = await bcrypt.hash(plainPassword, 10)
      return password
})

userSchema.static("hashPassword", async function hashPassword(plainPassword: string) {
      const password = await bcrypt.hash(plainPassword, 10)
      return password
})

//** Pre Hooks */
// Document middleware
userSchema.pre("save", async function (next) {
      console.log("Inside pre save hook: ", this)
      this.password = await bcrypt.hash(this.password, 10)
      next()
})
// Query middleware
userSchema.pre("find", async function (next) {
      console.log("Inside pre find hook")
      next()
})

//** Post Hooks */
// Document middleware
userSchema.post("save", async function (doc, next) {
      console.log("Inside post save hook: ", doc)
      console.log("%s has been saved", doc._id)
      next()
})
// Query middleware
userSchema.post("findOneAndDelete", async function (doc, next) {
      if (doc) {
            console.log("deleted user:", doc)
            await Note.deleteMany({ user: doc._id })
      }
      next()
})

// mongoose virtual
userSchema.virtual("fullName").get(function () {
      return `${this.firstName} ${this.lastName}`
})

// model
export const User = model<IUser, UserStaticMethod>("User", userSchema)
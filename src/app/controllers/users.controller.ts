import express, { Request, Response } from 'express'
import { User } from '../model/user.model'
import { z } from 'zod'

export const userRoute = express.Router()

// Zod Schema
const CreateUserZodSchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      age: z.number(),
      email: z.string(),
      password: z.string(),
      role: z.string().optional() // role field is optional
})

userRoute.post('/create-user', async (req: Request, res: Response) => {
      try {
            //** Zod schema validation
            // const body = await CreateUserZodSchema.parseAsync(req.body)
            const { body } = req
            //** Built in and custom intance methods
            // const user = new User(body)
            // const password = await user.hashPassword(body.password)
            // user.password = password
            // await user.save()

            //** Built in and custom static methods
            // const password = await User.hashPassword(body.password)
            // body.password = password
            const user = await User.create(body)

            res.status(201).json({
                  success: true,
                  message: "User created successfuly",
                  user
            })
      } catch (error: any) {
            // console.log(error)
            res.status(400).json({
                  success: false,
                  message: error.message,
                  error
            })
      }
})

userRoute.get('/', async (req: Request, res: Response) => {
      const users = await User.find()

      res.status(200).json({
            success: true,
            message: "Users retrived successfuly",
            users
      })
})

userRoute.get('/:userId', async (req: Request, res: Response) => {
      const { userId } = req.params
      const user = await User.findById(userId)

      res.status(200).json({
            success: true,
            message: "Single user retrived successfuly",
            user
      })
})

userRoute.patch('/:userId', async (req: Request, res: Response) => {
      const { userId } = req.params
      const updatedData = req.body
      const user = await User.findByIdAndUpdate(userId, updatedData, { new: true })

      res.status(200).json({
            success: true,
            message: "User updated successfuly",
            user
      })
})

userRoute.delete('/:userId', async (req: Request, res: Response) => {
      const { userId } = req.params
      // const user = await User.findByIdAndDelete(userId)
      const user = await User.findOneAndDelete({ _id: userId })

      res.status(200).json({
            success: true,
            message: "User deleted successfuly",
            user
      })
})
import express, { Request, Response } from 'express'
import { User } from '../model/user.model'

export const userRoute = express.Router()

userRoute.post('/create-user', async (req: Request, res: Response) => {
      const { body } = req
      const user = await User.create(body)

      res.status(201).json({
            success: true,
            message: "User created successfuly",
            user
      })
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
      const user = await User.findByIdAndDelete(userId)

      res.status(200).json({
            success: true,
            message: "User deleted successfuly",
            user
      })
})
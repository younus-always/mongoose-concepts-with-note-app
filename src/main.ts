import express, { Application, Request, Response } from 'express'
import { noteRoute } from './app/controllers/notes.controller'
import { userRoute } from './app/controllers/users.controller'
const app: Application = express()

// middleware
app.use(express.json())
app.use('/notes', noteRoute)
app.use('/users', userRoute)


app.get('/', (req: Request, res: Response) => {
      res.send('Welcome to Mongoose Note App')
})

export default app
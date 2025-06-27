import express, { Application, Request, Response } from 'express'
import { model, Schema } from 'mongoose'

const app: Application = express()

app.use(express.json())


// Schema
const noteSchema = new Schema(
      {
            title: {
                  type: String,
                  required: true,
                  trim: true
            },
            content: { type: String, default: '' },
            category: {
                  type: String,
                  enum: ["personal", "work", "study", "other"],
                  default: 'personal'
            },
            pinned: {
                  type: Boolean,
                  default: false
            },
            tags: {
                  label: { type: String, required: true },
                  color: { type: String, default: "black" }
            }
      },
      {
            versionKey: false,
            timestamps: true
      })
// model
const Note = model('Note', noteSchema)


app.post('/notes/create-note', async (req: Request, res: Response) => {
      const { body } = req
      // Approch -1 creating a data
      // const note = new Note(body)
      // await note.save()
      // Approch -2 creating a data
      const note = await Note.create(body)

      res.status(201).json({
            success: true,
            message: "Note created successfuly",
            note
      })
})

app.get('/notes', async (req: Request, res: Response) => {
      const notes = await Note.find()

      res.status(200).json({
            success: true,
            message: "Retrived all note successfuly",
            notes
      })
})

app.get('/notes/:noteId', async (req: Request, res: Response) => {
      const { noteId } = req.params
      // ** 2 ways to find single note (findOne, findById)
      // const note = await Note.findOne({ _id: noteId })
      const note = await Note.findById(noteId)

      res.status(200).json({
            success: true,
            message: "Retrived single note successfuly",
            note
      })
})

app.patch('/notes/:noteId', async (req: Request, res: Response) => {
      const { noteId } = req.params
      const updatedData = req.body
      // ** 3 ways to update single note (updateOne, findOneAndUpdate, findByIdAndUpdate)
      // const note = await Note.updateOne({_id: noteId}, updatedData, {new: true})
      // const note = await Note.findOneAndUpdate({_id: noteId}, updatedData, {new: true})
      const note = await Note.findByIdAndUpdate(noteId, updatedData, { new: true })

      res.status(200).json({
            success: true,
            message: "Note updated successfuly",
            note
      })
})

app.delete('/notes/:noteId', async (req: Request, res: Response) => {
      const { noteId } = req.params
      // **  ways to delete single note (deleteOne, findOneAndDelete, findByIdAndDelete)
      // const note = await Note.deleteOne({ _id: noteId })
      // const note = await Note.findOneAndDelete({_id: noteId})
      const note = await Note.findByIdAndDelete(noteId)

      res.status(200).json({
            success: true,
            message: "Note deleted successfuly",
            note
      })
})

app.get('/', (req: Request, res: Response) => {
      res.send('Welcome to Mongoose Note App')
})


export default app
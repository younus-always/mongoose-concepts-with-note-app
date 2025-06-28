import express, { Request, Response } from 'express'
import { Note } from '../model/notes.model'

export const noteRoute = express.Router()

noteRoute.post('/create-note', async (req: Request, res: Response) => {
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

noteRoute.get('/', async (req: Request, res: Response) => {
      const notes = await Note.find().populate("user")

      res.status(200).json({
            success: true,
            message: "Retrived all note successfuly",
            notes
      })
})

noteRoute.get('/:noteId', async (req: Request, res: Response) => {
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

noteRoute.patch('/:noteId', async (req: Request, res: Response) => {
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

noteRoute.delete('/:noteId', async (req: Request, res: Response) => {
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
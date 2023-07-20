

import { RequestHandler, Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import NoteModel, { Note } from "../models/note";
import UserModel from "../models/user";
import { io } from "../app";
import { AuthRequest } from "./user";
import mongoose, { Types } from "mongoose";



export const getSharedNotesHandler: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find({ isPersonal: false }).sort({ _id: -1 }).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};


export const getPersonalNotesHandler: RequestHandler = async (req:AuthRequest, res, next) => {
  try {
    const userId = req.user.id;

    const authorId = new mongoose.Types.ObjectId(userId);

    const notes: Note[] = await NoteModel.find({ isPersonal: true, 'author.id': authorId }).sort({ _id: -1 }).exec();

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};




export const getSingleNoteHandler: RequestHandler<{ id: string }> = async (req:AuthRequest, res, next) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid products id")
    }

    const note: Note | null = await NoteModel.findOne({
      _id: noteId,
      $or: [
        { isPersonal: false }, // Shared note can be accessed by anyone
        { isPersonal: true, 'author.id': userId }, // Personal note can only be accessed by the owner
      ],
    }).exec();

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};




export const createNoteHandler: RequestHandler<any, any, Note, any> = async ( req: AuthRequest, res: Response, next: NextFunction) => {
  const { category, title, tags, isPersonal, note } = req.body;

  try {

    if (!category || !title || !tags || isPersonal === undefined || !note) {
      throw createHttpError(400, 'Missing field');
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const author = { id: user._id, username: user.username };

    const newNote = await NoteModel.create({
      author,
      category,
      title,
      tags,
      isPersonal,
      note,
    });

    res.status(201).json(newNote);

    if (!isPersonal) {
      io.emit('noteCreated', newNote);
    }
  } catch (error) {
    next(error);
  }
};


























// export const createNoteHandler = (io: SocketIOServer): RequestHandler<any, any, CreateNoteBody, any> => async (req: Request, res: Response, next: NextFunction) => {
//     const { title, description, status, createdBy } = req.body;

//     try {
//       if (!title) {
//         throw createHttpError(400, "title is required");
//       }
//       if (!status) {
//         throw createHttpError(400, "status is required");
//       }

//       const newNote = await NoteModel.create({
//         title: title,
//         description: description,
//         status: status,
//         createdBy: createdBy,
//       });

//       res.status(201).json(newNote);
//       io.emit("NoteCreated", newNote);
//     } catch (error) {
//       next(error);
//     }
//   };

// ... Other imports and interfaces as before
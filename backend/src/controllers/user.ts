import { RequestHandler, Request } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";



export interface AuthRequest extends Request {
  user?: {
    userId: any;
    role: string;
    id: string;
  };
}




export const getUser: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.user || {};

    if (!id || !mongoose.isValidObjectId(id)) {
      throw createHttpError(404, "Invalid user id");
    }

    const user = await UserModel.findById(id).populate('savedItems');

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

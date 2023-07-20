import { NextFunction, RequestHandler, Response, Request } from "express";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken"
import UserModel from "../models/user"
import mongoose, { Document, Types } from 'mongoose';


interface User extends mongoose.Document {
  role: string;
  username: string;
  email: string;
  password: string;
  matchPasswords: (password: string) => Promise<boolean>;
}

interface AuthRequest extends Request {
  user?: Document & User; 
}

export const protect: RequestHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized to access this routey' });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
    const user = await UserModel.findById((decoded as JwtPayload).id);
  
    if (!user) {
      throw createHttpError(401, 'No user found with this id');
    }
  
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }
  
    throw createHttpError(401, 'Not authorized to access this routepuuu');
  }
  
}

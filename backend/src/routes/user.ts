import express from "express";
import * as UserController from '../controllers/user'
import { protect } from "../middlewares/authProtect";

const userRouter = express.Router();

userRouter.get("/", protect, UserController.getUser);

export default userRouter;

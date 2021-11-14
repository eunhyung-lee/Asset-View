import express from "express";
import { userDelete } from "../controllers/homeController.js";
const userRouter = express.Router();
userRouter.get("/delete", userDelete);

export default userRouter;

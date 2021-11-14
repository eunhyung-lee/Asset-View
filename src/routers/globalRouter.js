import express from "express"; // express 불러오기
import {
  home,
  handleGetAsset,
  handlePostAsset,
  handleGetUserAdd,
  handlePostUserAdd,
  getUserAsset,
  postUserAsset,
  userDelete,
} from "../controllers/homeController.js";
import userRouter from "./userRouter.js";
const globalRouter = express.Router();
globalRouter.get("/", home);

globalRouter.route("/:id([0-9a-f]{24})").get(getUserAsset).post(postUserAsset);
globalRouter.get("/:id([0-9a-f]{24})/delete", userDelete);

globalRouter.route("/asset").get(handleGetAsset).post(handlePostAsset);
globalRouter.route("/useradd").get(handleGetUserAdd).post(handlePostUserAdd);

export default globalRouter;

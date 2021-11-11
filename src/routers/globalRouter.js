import express from "express"; // express 불러오기
import {
  home,
  handleGetAsset,
  handlePostAsset,
  handleGetUserAdd,
  handlePostUserAdd,
  userAsset,
} from "../controllers/homeController.js";
const globalRouter = express.Router();
globalRouter.get("/", home);
globalRouter.get("/:id([0-9a-f]{24})", userAsset);
globalRouter.route("/asset").get(handleGetAsset).post(handlePostAsset);
globalRouter.route("/useradd").get(handleGetUserAdd).post(handlePostUserAdd);

export default globalRouter;

import express from "express"; // express 불러오기
import {
  home,
  handleGetAsset,
  handlePostAsset,
} from "../controllers/homeController";
const globalRouter = express.Router();
globalRouter.get("/", home);
globalRouter.route("/asset").get(handleGetAsset).post(handlePostAsset);

export default globalRouter;

import express from "express"; // express 불러오기
import { home, handleAsset } from "../controllers/homeController";
const globalRouter = express.Router();
globalRouter.get("/", home);
globalRouter.get("/asset", handleAsset);
export default globalRouter;

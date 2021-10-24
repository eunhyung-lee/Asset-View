import express from "express"; // express 불러오기
import { home, viewAsset } from "../controllers/homeController";
const globalRouter = express.Router();
globalRouter.get("/", home);
// globalRouter.get("/asset", viewAsset);

export default globalRouter;

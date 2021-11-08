import express from "express"; // express 불러오기
import morgan from "morgan"; //morgan 불러오기
import globalRouter from "./routers/globalRouter.js";
import "./db.js";
import "./models/Asset.js";
import "./googleSheet.js";

const PORT = 5500;
const app = express(); //create express application
const logger = morgan("dev");

app.set("view engine", "pug"); // view engine을 pug로 설정
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter); //global router home,asset

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
};
app.listen(PORT, handleListening); //callback, 필수로 필요함

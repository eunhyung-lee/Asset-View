import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/asset"); //wetube database로 연결

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = (error) => console.log("DBerror", error);
db.on("error", handleError);
db.once("open", handleOpen);
//on은 여러번 발생, once는 한번만 발생

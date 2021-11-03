import express from "express"; // express 불러오기
import morgan from "morgan"; //morgan 불러오기
import { GoogleSpreadsheet } from "google-spreadsheet";
import gs_creds from "../credentials.json";
import globalRouter from "./routers/globalRouter.js";
const PORT = 5500;
const app = express(); //create express application
const logger = morgan("dev");

const doc = new GoogleSpreadsheet(
  "1uT0nKutfx6ogmquFBoyJzsqLQHKkluX42M3WUE5KwBQ"
);
const ASSET_HISTORY = "AssetHistory";
const ASSET_SUM = "AssetSum";
const STOCK_LOCAL = "StockLocal";
const STOCK_OVERSEA = "StockOversea";
const REITS = "Reits";
const CASH_THINGS = "CashThings";
export let exchangeRate;
export let totalAsset;
export let netAsset;
export let debt;
async function authGoogleSheet() {
  try {
    await doc.useServiceAccountAuth(gs_creds);
  } catch (err) {
    console.log("AUTH ERROR", err);
  }
}
authGoogleSheet();

async function readSheet() {
  //async
  await doc.loadInfo(); // loads document properties and worksheets //await

  let assetSumSheet = doc.sheetsByTitle[ASSET_SUM];
  let stockLocalSheet = doc.sheetsByTitle[STOCK_LOCAL];
  let stockOverseaSheet = doc.sheetsByTitle[STOCK_OVERSEA];
  let stockReitsSheet = doc.sheetsByTitle[REITS];
  let cashSheet = doc.sheetsByTitle[CASH_THINGS];
  let assetItemRows = await assetSumSheet.getRows(); //await
  let stockLocalRows = await stockLocalSheet.getRows(); //await
  let stockOverseaRows = await stockOverseaSheet.getRows(); //await
  //   const exchangeRate = parseFloat(assetItemRows[0].ExchangeRate);
  exchangeRate = parseFloat(assetItemRows[0].ExchangeRate);
  totalAsset = assetItemRows[0].TotalAsset;
  netAsset = assetItemRows[0].NetAsset;
  debt = assetItemRows[0].debt;
  //   console.log(`환율 : ${parseFloat(exchangeRate)}`);
  //   console.log(`국내주식 : ${assetItemRows[0].StockLocalSum}`);
  //   console.log(`해외주식 : ${assetItemRows[0].StockOverseaSum}`);
  //   console.log(`부동산(리츠) : ${assetItemRows[0].ReitsSum}`);
  //   console.log(`현금성자산 : ${assetItemRows[0].CashThings}`);
  //   console.log(`주택청약통장 : ${assetItemRows[0].ApartmentApplication}`);
  //   console.log(`연금펀드 : ${assetItemRows[0].PensionFunds}`);
  //   console.log(`차입금 : ${assetItemRows[0].debt}`);
  //   console.log(`순자본 : ${assetItemRows[0].NetAsset}`);
  //   console.log(`총자산 : ${assetItemRows[0].TotalAsset}`);
  //   stockLocalRows.forEach((ele) => {
  //     console.log(`${ele.Item} : ${parseFloat(ele.PriceTotal)}`);
  //   });
  //   stockOverseaRows.forEach((ele) => {
  //     console.log(`${ele.Item} : ${parseFloat(ele.PriceTotal) * exchangeRate}`);
  //   });
}
readSheet();

app.set("view engine", "pug"); // view engine을 pug로 설정
app.set("views", process.cwd() + "/src/views");
app.use(logger);

app.use("/", globalRouter);

const handleAsset = (req, res) => {
  res.render("asset", { exchangeRate, totalAsset, netAsset, debt });
};
app.get("/asset", handleAsset);

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
};
app.listen(PORT, handleListening); //callback, 필수로 필요함

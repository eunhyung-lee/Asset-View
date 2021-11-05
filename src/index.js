// const { GoogleSpreadsheet } = require("google-spreadsheet");
import { GoogleSpreadsheet } from "google-spreadsheet";
// const gs_creds = require("./credentials.json");

import gs_creds from "../credentials.json";
const doc = new GoogleSpreadsheet(
  "1uT0nKutfx6ogmquFBoyJzsqLQHKkluX42M3WUE5KwBQ"
);
const ASSET_HISTORY = "AssetHistory";
const ASSET_SUM = "AssetSum";
const STOCK_LOCAL = "StockLocal";
const STOCK_OVERSEA = "StockOversea";
const REITS = "Reits";
const CASH_THINGS = "CashThings";

async function authGoogleSheet() {
  // console.log("auth start");
  try {
    await doc.useServiceAccountAuth(gs_creds);
  } catch (err) {
    console.log("AUTH ERROR", err);
  }
  // console.log("auth end");
}
authGoogleSheet();

async function readSheet() {
  // console.log("data road start");

  await doc.loadInfo(); // loads document properties and worksheets
  let assetSumSheet = doc.sheetsByTitle[ASSET_SUM];
  let stockLocalSheet = doc.sheetsByTitle[STOCK_LOCAL];
  let stockOverseaSheet = doc.sheetsByTitle[STOCK_OVERSEA];
  let stockReitsSheet = doc.sheetsByTitle[REITS];
  let cashSheet = doc.sheetsByTitle[CASH_THINGS];
  let assetItemRows = await assetSumSheet.getRows();
  let stockLocalRows = await stockLocalSheet.getRows();
  let stockOverseaRows = await stockOverseaSheet.getRows();
  const exchangeRate = parseFloat(assetItemRows[0].ExchangeRate);

  console.log(`환율 : ${parseFloat(exchangeRate)}`);
  console.log(`국내주식 : ${assetItemRows[0].StockLocalSum}`);
  console.log(`해외주식 : ${assetItemRows[0].StockOverseaSum}`);
  console.log(`부동산(리츠) : ${assetItemRows[0].ReitsSum}`);
  console.log(`현금성자산 : ${assetItemRows[0].CashThings}`);
  console.log(`주택청약통장 : ${assetItemRows[0].ApartmentApplication}`);
  console.log(`연금펀드 : ${assetItemRows[0].PensionFunds}`);
  console.log(`차입금 : ${assetItemRows[0].debt}`);
  console.log(`순자본 : ${assetItemRows[0].NetAsset}`);
  console.log(`총자산 : ${assetItemRows[0].TotalAsset}`);
  stockLocalRows.forEach((ele) => {
    console.log(`${ele.Item} : ${parseFloat(ele.PriceTotal)}`);
  });
  stockOverseaRows.forEach((ele) => {
    console.log(`${ele.Item} : ${parseFloat(ele.PriceTotal) * exchangeRate}`);
  });

  // * parseFloat(exchangeRate)
  // assetItems.forEach((ele) => {
  //   console.log(
  //     ele._rawData[0],
  //     ele._rawData[1],
  //     ele._rawData[2],
  //     ele._rawData[3],
  //     ele._rawData[4],
  //     ele._rawData[5],
  //     ele._rawData[6],
  //     ele._rawData[7]
  //   );
  // });
  // console.log(assetItems);

  // const rows = await sheet.getRows();
  // console.log(rows.length);
  // console.log(rows[0].date);
  // console.log(rows[0].test1);
  // console.log("\n", rows[0].test2);
  // rows[0].test2 = 111;
  // await rows[0].save();

  // console.log(doc.title);
  // console.log(doc.sheetsByIndex[0].title);
  // console.log(doc.sheetsByIndex[0].rowCount);
  // console.log("data road end");
}
readSheet();

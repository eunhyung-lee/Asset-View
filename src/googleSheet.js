import { GoogleSpreadsheet } from "google-spreadsheet";
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
export let exchangeRate;
export let totalAsset;
export let netAsset;
export let debt;
export let stockLocal = [];
export async function authGoogleSheet() {
  try {
    await doc.useServiceAccountAuth(gs_creds);
    console.log("auth success");
  } catch (err) {
    console.log("AUTH ERROR", err);
  }
}
authGoogleSheet();

export async function readSheet() {
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
  exchangeRate = parseFloat(assetItemRows[0].ExchangeRate);
  totalAsset = assetItemRows[0].TotalAsset;
  netAsset = assetItemRows[0].NetAsset;
  debt = assetItemRows[0].debt;
  stockLocal = [];
  stockLocal.push(stockLocalRows[0].PriceTotal);
  stockLocal.push(stockLocalRows[1].PriceTotal);
  stockLocal.push(stockLocalRows[2].PriceTotal);
  stockLocal.push(stockLocalRows[3].PriceTotal);
  stockLocal.push(parseFloat(stockOverseaRows[0].PriceTotal) * exchangeRate);
  console.log("update success");
}

export async function getPrice(stockInfo) {
  await doc.loadInfo();
  let stockLocalSheet = doc.sheetsByTitle[STOCK_LOCAL];
  const rows = await stockLocalSheet.getRows();
  rows[4].market = stockInfo.market;
  rows[4].ticker = stockInfo.ticker;
  rows[4].NumberOf = stockInfo.amount;
  await rows[4].save();
  console.log(rows[4].PriceEach);
  // stockInfo.item
}
// readSheet();

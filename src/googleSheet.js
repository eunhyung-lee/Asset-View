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

export async function getPrice(stocks) {
  await doc.loadInfo();
  let stockLocalSheet = doc.sheetsByTitle[STOCK_LOCAL];
  let rows = await stockLocalSheet.getRows();
  let count;
  let stockIndex;
  let savedStocks = rows.length;
  let stockRowNum = rows.length;

  for (stockIndex = 0; stockIndex < stocks.length; stockIndex++) {
    for (count = 0; count < rows.length; count++) {
      if (rows[count].Item === stocks[stockIndex].item) {
        stocks[stockIndex].price = rows[count].PriceEach;
        break;
      }
    }
    if (count === rows.length) {
      const newRow = await stockLocalSheet.addRow({
        market: stocks[stockIndex].market,
        Item: stocks[stockIndex].item,
        ticker: stocks[stockIndex].ticker,
        NumberOf: stocks[stockIndex].amount,
        PriceEach: `=IFERROR(GOOGLEFINANCE(concatenate(A${
          rows.length + 2
        },":",C${rows.length + 2}),"price"),"-1")`,
      });

      await doc.loadInfo();
      stockLocalSheet = doc.sheetsByTitle[STOCK_LOCAL];
      rows = await stockLocalSheet.getRows();
      stocks[stockIndex].price = rows[rows.length - 1].PriceEach;
    }
    stocks[stockIndex].updated = Date.now();
  }
  return stocks;
}

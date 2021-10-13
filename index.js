const { GoogleSpreadsheet } = require("google-spreadsheet");
const gs_creds = require("./credentials.json");
const doc = new GoogleSpreadsheet(
  "1uT0nKutfx6ogmquFBoyJzsqLQHKkluX42M3WUE5KwBQ"
);
const STOCK_COMPOSITE = "StockComposite";
const ASSET_HISTORY = "AssetHistory";
const ASSET_SUM = "AssetSum";
const STOCK_LOCAL = "StockLocal";
const STOCK_OVERSEA = "StockOversea";
const REITS = "Reits";
const CASH_THINGS = "CashThings";

async function authGoogleSheet() {
  console.log("auth start");
  try {
    await doc.useServiceAccountAuth(gs_creds);
  } catch (err) {
    console.log("AUTH ERROR", err);
  }
  console.log("auth end");
}
authGoogleSheet();

async function readSheet() {
  console.log("data road start");

  await doc.loadInfo(); // loads document properties and worksheets
  let stockSheet = doc.sheetsByTitle[STOCK_COMPOSITE];
  let assetSheet = doc.sheetsByTitle[ASSET_HISTORY];

  let rows = await assetSheet.getRows({ offset: 0, limit: 4 });
  rows.forEach((ele) => {
    console.log(ele._rawData[0], ele._rawData[1], ele._rawData[2]);
  });
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
  console.log("data road end");
}
readSheet();
console.log("program end");

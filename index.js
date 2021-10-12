const { GoogleSpreadsheet } = require("google-spreadsheet");
const gs_creds = require("./credentials.json");
const doc = new GoogleSpreadsheet(
  "1uT0nKutfx6ogmquFBoyJzsqLQHKkluX42M3WUE5KwBQ"
);

async function authGoogleSheet() {
  console.log("Auth start");
  try {
    await doc.useServiceAccountAuth(gs_creds);
    // await doc.loadInfo();
  } catch (err) {
    console.log("AUTH ERROR", err);
  }
  console.log("Auth end");
}
authGoogleSheet();

async function readFirstSheet() {
  console.log("data road start");

  await doc.loadInfo(); // loads document properties and worksheets
  var sheet = doc.sheetsByIndex[0];
  // const rows = await sheet.getRows();
  // console.log(rows.length);
  // console.log(rows[0].date);
  // console.log(rows[0].test1);
  // console.log("\n", rows[0].test2);
  // rows[0].test2 = 111;
  // await rows[0].save();

  var rows = await sheet.getRows({ offset: 0, limit: 4 });
  rows.forEach((ele) => {
    // console.log(rows.length);
    // console.log(count);
    // count++;
    console.log(ele._rawData[0], ele._rawData[1]);
  });
  // console.log(doc.title);
  // console.log(doc.sheetsByIndex[0].title);
  // console.log(doc.sheetsByIndex[0].rowCount);

  console.log("data road end");
}
readFirstSheet();

console.log("hi");
console.log("hi");
console.log("hi");
console.log("hi");

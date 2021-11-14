import mongoose from "mongoose";

//asset schema
const stockSchema = new mongoose.Schema({
  market: String,
  item: String,
  ticker: String,
  amount: Number,
  price: { type: Number, default: -1 },
  updated: { type: Date, required: true, default: Date.now },
});
const assetSchema = new mongoose.Schema({
  name: { type: String },
  // stockLocalSum: { type: Number },
  // stockOverseaSum: { type: Number },
  // reitsSum: { type: Number },
  // cashSum: { type: Number },
  // debt: { type: Number },
  // netAsset: { type: Number },
  // totalAsset: { type: Number },
  localStock: [stockSchema],
  // local: [{ type: Object }],
  // {
  //   market: String,
  //   item: String,
  //   ticker: Number,
  //   amount: Number,
  // },

  //   oversea: [
  //     {
  //       market: String,
  //       item: String,
  //       ticker: String,
  //       amount: Number,
  //     },
  //   ],
  //   reits: [
  //     {
  //       market: String,
  //       item: String,
  //       ticker: Number,
  //       amount: Number,
  //     },
  //   ],
  // },
  // cashThing: {
  //   defi: { type: Number },
  //   deposit: {
  //     shinhan: { type: Number },
  //     namu: { type: Number },
  //     publicOffering: { type: Number },
  //   },
  //   pensionFund: { type: Number },
  //   apartmentApplication: { type: Number },
  // },
  // debt: { type: Number },
});

const User = mongoose.model("User", assetSchema);
export const Stock = mongoose.model("Stock", stockSchema);
export default User;

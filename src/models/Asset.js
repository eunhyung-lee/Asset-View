import mongoose from "mongoose";

//asset schema
const assetSchema = new mongoose.Schema({
  name: { type: String },
  stockLocalSum: { type: Number },
  stockOverseaSum: { type: Number },
  reitsSum: { type: Number },
  cashSum: { type: Number },
  debt: { type: Number },
  netAsset: { type: Number },
  totalAsset: { type: Number },
  stock: {
    local: [
      {
        market: String,
        item: String,
        ticker: Number,
        amount: Number,
      },
    ],
    oversea: [
      {
        market: String,
        item: String,
        ticker: String,
        amount: Number,
      },
    ],
    reits: [
      {
        market: String,
        item: String,
        ticker: Number,
        amount: Number,
      },
    ],
  },
  cashThing: {
    defi: { type: Number },
    deposit: {
      shinhan: { type: Number },
      namu: { type: Number },
      publicOffering: { type: Number },
    },
    pensionFund: { type: Number },
    apartmentApplication: { type: Number },
  },
  debt: { type: Number },
});

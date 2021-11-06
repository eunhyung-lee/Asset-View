import {
  exchangeRate,
  totalAsset,
  netAsset,
  debt,
  stockLocal,
} from "../googleSheet";
import { authGoogleSheet, readSheet } from "../googleSheet";

export const home = (req, res) => {
  return res.render("home");
};
export const handleGetAsset = async (req, res) => {
  await readSheet();
  return res.render("asset", {
    exchangeRate,
    totalAsset,
    netAsset,
    debt,
    stockLocal,
  });
};
export const handlePostAsset = async (req, res) => {
  await readSheet();
  return res.render("asset", {
    exchangeRate,
    totalAsset,
    netAsset,
    debt,
    stockLocal,
  });
};

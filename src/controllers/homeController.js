import {
  exchangeRate,
  totalAsset,
  netAsset,
  debt,
  stockLocal,
} from "../server";

export const home = (req, res) => {
  return res.render("home");
};
export const handleAsset = (req, res) => {
  res.render("asset", { exchangeRate, totalAsset, netAsset, debt, stockLocal });
};

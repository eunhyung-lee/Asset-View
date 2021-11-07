import {
  exchangeRate,
  totalAsset,
  netAsset,
  debt,
  stockLocal,
  readSheet,
} from "../googleSheet";

export const home = (req, res) => {
  return res.render("home", { pageTitle: "User List" });
};
export const handleGetUserAdd = (req, res) => {
  return res.render("addUser", { pageTitle: "Make Profile" });
};
export const handlePostUserAdd = (req, res) => {
  return res.send("PostAdd");
};
export const handleGetAsset = async (req, res) => {
  await readSheet();
  return res.render("asset", {
    pageTitle: "Asset",
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
    pageTitle: "Asset",
    exchangeRate,
    totalAsset,
    netAsset,
    debt,
    stockLocal,
  });
};

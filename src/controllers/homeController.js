import {
  exchangeRate,
  totalAsset,
  netAsset,
  debt,
  stockLocal,
  readSheet,
} from "../googleSheet";
import User from "../models/Asset.js";

export const home = async (req, res) => {
  try {
    const users = await User.find({});
    return res.render("home", { pageTitle: "User List", users });
  } catch {
    return res.send("server-error");
  }
};

// home에서 user click시 asset show
export const showAsset = async (req, res) => {
  return res.send("making");
};

//user add
export const handleGetUserAdd = (req, res) => {
  return res.render("addUser", { pageTitle: "Make Profile" });
};
export const handlePostUserAdd = async (req, res) => {
  let localStockCount = 1;
  const localStocks = [];
  const { userName } = req.body;

  while (req.body[`LocalName${localStockCount}`]) {
    // localStocks[localStockCount - 1] = {
    localStocks.push({
      market: req.body[`market${localStockCount}`],
      item: req.body[`LocalName${localStockCount}`],
      ticker: req.body[`ticker${localStockCount}`],
      amount: req.body[`amount${localStockCount}`],
    });
    localStockCount++;
  }

  const user = new User({
    name: userName,
    stock: localStocks,
  });
  try {
    await user.save(); // database에 저장
    return res.redirect("/");
  } catch (error) {
    //error 처리
    return res.render("addUser", {
      pageTitle: "Make Profile",
      errorMessage: error._message,
    });
  }
  // console.log(user);

  // return res.redirect("/");
};

//asset page
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

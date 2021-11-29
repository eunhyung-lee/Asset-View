import {
  exchangeRate,
  totalAsset,
  netAsset,
  debt,
  stockLocal,
  readSheet,
  getPrice,
} from "../googleSheet";
import User, { Stock } from "../models/Asset.js";

export const home = async (req, res) => {
  try {
    const users = await User.find({});
    return res.render("home", { pageTitle: "User List", users });
  } catch {
    return res.render("404", { pageTitle: "Error" });
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
  let localStocks = [];
  const { userName } = req.body;

  //주식 정보 array로 저장
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
  localStocks = await getPrice(localStocks);

  //db에 저장할 user schema 생성
  const user = new User({
    name: userName,
    localStock: localStocks,
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

//user profile page GET, POST
export const getUserAsset = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.render("404", { pageTitle: "Error" });
  }
  let totalAsset = 0;
  let totalAssetYest = 0;
  user.localStock.forEach((ele) => {
    totalAsset += ele.price * ele.amount;
    totalAssetYest += ele.priceYest * ele.amount;
  });
  console.log(totalAsset);
  return res.render("profile", {
    pageTitle: "Profile",
    user,
    totalAsset,
    totalAssetYest,
  });
};
export const postUserAsset = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    //error 처리
    return res.render("404", { pageTitle: "Error" });
  }
  if (req.body.update) {
    //refresh click시, /id/update로 빼야됨
    //update click시
    let updatedStock = [];
    updatedStock = await getPrice(user.localStock);
    await User.findByIdAndUpdate(id, { localStock: updatedStock });
    return res.redirect(`/${id}`);
  } else if (req.body.deleteLocalStock) {
    //delete local stock click 시
    const stockItem = req.body.deleteLocalStock.split(" ")[1];
    let nth;
    const stockForDelete = user.localStock.find((ele, index) => {
      if (ele.item === stockItem) {
        nth = index;
        return true;
      }
    });
    const newStockArr = user.localStock.splice(nth, 1);
    await User.findByIdAndUpdate(id, {
      localStock: user.localStock,
    });
    return res.redirect(`/${id}`);
  } else if (req.body.localStockAdd) {
    //Local Stock Add Button Click시
    let localStocks = user.localStock;

    //겹치는거 체크
    let stockCheck = user.localStock.find((ele) => {
      if (ele.item === req.body.itemNew || ele.ticker === req.body.tickerNew) {
        return true;
      }
    });
    if (stockCheck) {
      return res.render("profile", {
        pageTitle: "Profile",
        user,
        errorMessage: "stock Name or Ticker is taken",
      });
    }

    //겹치지 않을 경우
    localStocks.push({
      market: req.body.marketNew,
      item: req.body.itemNew,
      ticker: req.body.tickerNew,
      amount: req.body.amountNew,
    });
    localStocks = await getPrice(localStocks);
    await User.findByIdAndUpdate(id, {
      localStock: user.localStock,
    });
    return res.redirect(`/${id}`);
  }
};

//delete profile
export const userDelete = async (req, res) => {
  //delete button click시
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    //error 처리
    return res.render("404", { pageTitle: "Error" });
  }
  await User.findByIdAndDelete(id);
  return res.redirect("/");
};

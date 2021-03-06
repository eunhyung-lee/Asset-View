import {
  exchangeRate,
  totalAsset,
  netAsset,
  debt,
  stockLocal,
  readSheet,
} from "../googleSheet.js";
google.charts.load("current", { packages: ["corechart", "table"] });
google.charts.setOnLoadCallback(drawStockComposition);
let stockData; // 주식 구성 변수
let stockOptions;
let stockChart;
console.log(stockLocal);
function drawStockComposition() {
  stockData = new google.visualization.DataTable();
  stockData.addColumn("string", "stock");
  stockData.addColumn("number", "amounts");
  stockData.addRow(["VOO etf", stockLocal[4]]);
  stockData.addRow(["신한지주", stockLocal[0]]);
  stockData.addRow(["PI첨단소재", stockLocal[1]]);
  stockData.addRow(["펄어비스", stockLocal[2]]);
  stockData.addRow(["삼성전자", stockLocal[3]]);
  stockOptions = {
    title: "My Stock Composition",
  };

  stockChart = new google.visualization.PieChart(
    document.getElementById("stock-chart")
  );

  stockChart.draw(stockData, stockOptions);
}

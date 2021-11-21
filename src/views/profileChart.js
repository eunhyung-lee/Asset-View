//DB에 저장된 user에 대한 정보를 그대로 불러와서 userObj에 저장
const temp = test.replace(/&quot;/g, '"');
const userObj = JSON.parse(temp);
const localStocks = userObj.localStock;

google.charts.load("current", { packages: ["corechart", "table"] });
google.charts.setOnLoadCallback(drawStockComposition);
let stockData; // 주식 구성 변수
let stockOptions;
let stockChart;

function drawStockComposition() {
  stockData = new google.visualization.DataTable();
  stockData.addColumn("string", "stock");
  stockData.addColumn("number", "amounts");

  // user의 stock마다 row 추가
  localStocks.forEach(function (stock, index) {
    stockData.addRow([stock.item, stock.price * stock.amount]);
  });

  stockOptions = {
    title: "My Stock Composition",
  };

  stockChart = new google.visualization.PieChart(
    document.getElementById("stock-chart")
  );

  stockChart.draw(stockData, stockOptions);
}

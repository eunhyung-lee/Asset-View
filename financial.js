//google chart 붙여넣기
//google chart 붙여넣기
//google chart 붙여넣기
//google chart 붙여넣기
google.charts.load("current", { packages: ["corechart", "table"] });
// google.charts.setOnLoadCallback(drawChart);

google.charts.setOnLoadCallback(drawStockComposition);
google.charts.setOnLoadCallback(drawAssetComposition);
google.charts.setOnLoadCallback(drawInvestmentIncome);
google.charts.setOnLoadCallback(drawTotalAsset);

let stockData; // 주식 구성 변수
let stockOptions;
let stockChart;
function drawStockComposition() {
  stockData = new google.visualization.DataTable();
  stockData.addColumn("string", "stock");
  stockData.addColumn("number", "amounts");
  stockData.addRow(["VOO etf", 29703198]);
  stockData.addRow(["신한지주", 3792700]);
  stockData.addRow(["PI첨단소재", 9746400]);
  stockData.addRow(["펄어비스", 4400000]);
  stockData.addRow(["삼성전자", 9581000]);
  stockOptions = {
    title: "My Stock Composition",
  };

  stockChart = new google.visualization.PieChart(
    document.getElementById("stock-chart")
  );

  stockChart.draw(stockData, stockOptions);
}

let assetData; // 자산 구성 변수
let assetOptions;
let assetChart;
function drawAssetComposition() {
  assetData = new google.visualization.DataTable();
  assetData.addColumn("string", "item");
  assetData.addColumn("number", "amounts");
  assetData.addRow(["해외주식", 29703198]);
  assetData.addRow(["국내주식", 27520100]);
  assetData.addRow(["부동산(리츠)", 7086250]);
  assetData.addRow(["연금펀드", 2200000]);
  assetData.addRow(["주택청약", 1000000]);
  assetData.addRow(["현금성자산", 2383350]);
  assetOptions = {
    title: "My Asset Composition",
  };
  assetChart = new google.visualization.PieChart(
    document.getElementById("asset-chart")
  );
  assetChart.draw(assetData, assetOptions);
}

let investmentIncomeData;
let investmentIncomeOptions;
let investmentIncomeChart;
function drawInvestmentIncome() {
  investmentIncomeData = new google.visualization.DataTable();
  investmentIncomeData.addColumn("string", "date");
  investmentIncomeData.addColumn("number", "amounts");
  investmentIncomeData.addRow(["9/26", 6051024]);
  investmentIncomeData.addRow(["10/03", 4226655]);
  investmentIncomeData.addRow(["10/10", 4467757]);
  investmentIncomeOptions = {
    title: "Total Investment Income",
    pointSize: 10,
    hAxis: {
      // title: "Date",
      titleTextStyle: {
        // color: '#01579b',
        // fontSize: 20,
        // fontName: 'Arial',
        bold: true,
        italic: false,
      },
    },
    vAxis: {
      title: "Total Investment Income",
      titleTextStyle: {
        // color: '#01579b',
        // fontSize: 20,
        // fontName: 'Arial',
        bold: true,
        italic: false,
      },
    },
    // colors: ["#a52714", "#097138"],
    crosshair: {
      color: "black",
      trigger: "both",
    },
    legend: { position: "bottom" },
  };

  investmentIncomeChart = new google.visualization.LineChart(
    document.getElementById("investment-income-graph")
  );
  investmentIncomeChart.draw(investmentIncomeData, investmentIncomeOptions);
  // investmentIncomeChart.setSelection([{ row: 0, column: 1 }]);
}

let totalAssetData;
let totalAssetOptions;
let totalAssetChart;
function drawTotalAsset() {
  totalAssetData = new google.visualization.DataTable();
  totalAssetData.addColumn("string", "date");
  totalAssetData.addColumn("number", "Net Capital");
  totalAssetData.addColumn("number", "Total Dept");
  totalAssetData.addRow(["8/21", 34525169, 20000000]);
  totalAssetData.addRow(["8/29", 39511198, 20000000]);
  totalAssetData.addRow(["9/5", 40557401, 13000000]);
  totalAssetData.addRow(["9/12", 40077412, 17000000]);
  totalAssetData.addRow(["9/19", 40492503, 17000000]);
  totalAssetData.addRow(["9/26", 43376120, 19000000]);
  totalAssetData.addRow(["10/03", 41651751, 29000000]);
  totalAssetData.addRow(["10/10", 41892853, 28000000]);

  totalAssetOptions = {
    title: "Total Asset",
    isStacked: true,
    pointSize: 10,
    // axisTitlesPosition: "in",
    hAxis: {
      // title: "Date",
      titleTextStyle: {
        // color: '#01579b',
        // fontSize: 20,
        // fontName: 'Arial',
        bold: true,
        italic: false,
      },
    },
    vAxis: {
      title: "Total Asset",
      titleTextStyle: {
        // color: '#01579b',
        // fontSize: 20,
        // fontName: 'Arial',
        bold: true,
        italic: false,
      },
    },
    crosshair: {
      color: "black",
      trigger: "both",
    },
    legend: { position: "bottom" },
  };
  totalAssetChart = new google.visualization.AreaChart(
    document.getElementById("total-asset-graph")
  );
  totalAssetChart.draw(totalAssetData, totalAssetOptions);
}

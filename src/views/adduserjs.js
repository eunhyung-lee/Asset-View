const localDiv = document.getElementById("local-box");
const addLocalStockButton = document.querySelector("#add-local-stock");
const localStockAddButton = document.getElementById("add-local-stock");
let localCount = 1;

addLocalStockButton.addEventListener("click", addLocalStock);
addLocalStock();
function addLocalStock(event) {
  addLocalStock();
}
function addLocalStock() {
  const totalBoxDiv = document.createElement("div");
  const krxLabel = document.createElement("label");
  const krxInput = document.createElement("input");
  const kosdaqLabel = document.createElement("label");
  const kosdaqInput = document.createElement("input");
  const nameInput = document.createElement("input");
  const tickerInput = document.createElement("input");
  const amountInput = document.createElement("input");
  krxLabel.innerText = "krx";
  kosdaqLabel.innerText = "kosdaq";
  //주식 시장 선택
  krxInput.value = "krx";
  krxInput.type = "radio";
  krxInput.name = `market${localCount}`;

  kosdaqInput.value = "kosdaq";
  kosdaqInput.type = "radio";
  kosdaqInput.name = `market${localCount}`;

  //주식 이름
  nameInput.name = `LocalName${localCount}`;
  nameInput.placeholder = "주식명 입력";

  //주식 티커명
  tickerInput.name = `ticker${localCount}`;
  tickerInput.placeholder = "티커 입력";

  //주식 보유 수량
  amountInput.name = `amount${localCount}`;
  amountInput.placeholder = "보유 수량 입력";

  totalBoxDiv.style.border = "solid";
  console.log(localCount);
  localCount++;
  krxLabel.appendChild(krxInput);
  kosdaqLabel.appendChild(kosdaqInput);
  totalBoxDiv.appendChild(krxLabel);
  totalBoxDiv.appendChild(kosdaqLabel);
  totalBoxDiv.appendChild(nameInput);
  totalBoxDiv.appendChild(tickerInput);
  totalBoxDiv.appendChild(amountInput);
  localStockAddButton.before(totalBoxDiv);
}

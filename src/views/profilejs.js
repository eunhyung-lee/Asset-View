const editButton = document.getElementById("addLocalStock");
editButton.addEventListener("click", addLocalStock);
function addLocalStock() {
  const totalBoxDiv = document.createElement("div");
  const krxLabel = document.createElement("label");
  const krxInput = document.createElement("input");
  const kosdaqLabel = document.createElement("label");
  const kosdaqInput = document.createElement("input");
  const nameInput = document.createElement("input");
  const tickerInput = document.createElement("input");
  const amountInput = document.createElement("input");
  const addButton = document.createElement("input");
  krxLabel.innerText = "krx";
  kosdaqLabel.innerText = "kosdaq";
  //주식 시장 선택
  krxInput.value = "krx";
  krxInput.type = "radio";
  krxInput.name = `marketNew`;

  kosdaqInput.value = "kosdaq";
  kosdaqInput.type = "radio";
  kosdaqInput.name = `marketNew`;

  //주식 이름
  nameInput.name = `itemNew`;
  nameInput.placeholder = "주식명 입력";

  //주식 티커명
  tickerInput.name = `tickerNew`;
  tickerInput.placeholder = "티커 입력";

  //주식 보유 수량
  amountInput.name = `amountNew`;
  amountInput.placeholder = "보유 수량 입력";

  totalBoxDiv.style.border = "solid";

  addButton.type = "submit";
  addButton.value = "Add Local Stock";
  addButton.name = "localStockAdd";

  krxLabel.appendChild(krxInput);
  kosdaqLabel.appendChild(kosdaqInput);
  totalBoxDiv.appendChild(krxLabel);
  totalBoxDiv.appendChild(kosdaqLabel);
  totalBoxDiv.appendChild(nameInput);
  totalBoxDiv.appendChild(tickerInput);
  totalBoxDiv.appendChild(amountInput);
  totalBoxDiv.appendChild(addButton);
  editButton.before(totalBoxDiv);
  editButton.style.display = "none";
}
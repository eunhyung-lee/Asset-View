const localDiv = document.getElementById("local-box");
const addLocalStockButton = document.querySelector("#add-local-stock");
addLocalStockButton.addEventListener("click", addLocalStock);
function addLocalStock(event) {
  const totalBoxDiv = document.createElement("div");
  const krxLabel = document.createElement("label");
  const krxInput = document.createElement("input");
  const nameInput = document.createElement("input");
  krxLabel.innerText = "krx";
  krxInput.value = "krx";
  krxInput.type = "radio";
  krxInput.name = "market2";
  nameInput.name = "LocalName2";
  nameInput.placeholder = "input name";
  krxLabel.appendChild(krxInput);
  totalBoxDiv.appendChild(krxLabel);
  totalBoxDiv.appendChild(nameInput);
  localDiv.append(totalBoxDiv);
}

function callData() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function createHTMLString(item) {
  return `
        <li>
            <img src='${item.image}' alt='${item.type}'/>
            <span>${item.gender}, ${item.size}</span>
        </li>
    `;
}

function displayItem(items) {
  const itemBox = document.querySelector(".items");
  itemBox.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function onBtn(event, items) {
  const target = event.target.dataset;
  const key = target.key;
  const value = target.value;

  if (key === null || value === null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  displayItem(filtered);
}

function setEventListener(items) {
  const buttons = document.querySelector(".buttons");
  buttons.addEventListener("click", (event) => onBtn(event, items));
}

callData().then((items) => {
  displayItem(items);
  setEventListener(items);
});

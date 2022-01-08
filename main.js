function callData() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function createHTMLString(item) {
  return `
        <li>
            <img src='${item.image}' alt='${item.type}' />
            <span>${item.gender}, ${item.size}</span>
        </li>
    `;
}

function displayList(items) {
  const dataList = document.querySelector(".items");
  dataList.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function onButtonClick(event, items) {
  const target = event.target.dataset;
  const key = target.key;
  const value = target.value;

  if (key === null || value === null) {
    return;
  }
  const filtered = items.filter((item) => item[key] === value);
  displayList(filtered);
}

function setEventListener(items) {
  const buttons = document.querySelector(".buttons");
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

callData().then((items) => {
  displayList(items);
  setEventListener(items);
});

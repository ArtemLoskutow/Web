const addButtons = document.querySelectorAll(".buy-button");
const cartCount = document.querySelector("#cart-count");

let count = 0;

function addOneItem(event) {
    count = count + 1;
    cartCount.textContent = count;
    event.target.textContent = "Добавлено";
}

addButtons.forEach((button) => { button.addEventListener("click", addOneItem);});
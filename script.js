const catalogue = document.querySelector("#catalogue");

// 1. Load items from list in articles in main block

const items = [
    {
        id: 1,
        title: "Набор деталей",
        price: 1,
        type: "сплав белокамня"
    },
    {
        id: 2,
        title: "Набор инструментов",
        price: 5,
        type: "сплава белокамня"
    },
    {
        id: 3,
        title: "Центнер бетона",
        price: 10,
        type: "сплава белокамня"
    }
]

items.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("ItemCard");

    const title = document.createElement("h3");
    title.textContent = item.title;

    const price = document.createElement("p");
    price.textContent = `Цена: ${item.price} ${item.type}`;

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("BuyButton");
    button.dataset.id = item.id;
    button.textContent = "Добавить в корзину";

    card.append(title);
    card.append(price);
    card.append(button);
    catalogue.append(card);
});

// /1



// 2. Cart & buttons

const cart_count = document.querySelector("#cart-count");
const add_buttons = document.querySelectorAll(".BuyButton");
let count = 0;

function addToCart(event) {
    const selected_item_id = items.find((item) => { return item.id == event.target.dataset.id; });
    count = count + selected_item_id.price;
    cart_count.textContent = count;
    event.target.textContent = "Добавлено";
}

add_buttons.forEach((button) => { button.addEventListener("click", addToCart); });

// /2



// 3. Cart window

const openButton = document.querySelector('#open-window');
const closeButton = document.querySelector('#close-window');
const windowElement = document.querySelector('#cart');

openButton.addEventListener('click', () => {
    windowElement.showModal();
});

closeButton.addEventListener('click', () => {
    windowElement.close();
});

// /3
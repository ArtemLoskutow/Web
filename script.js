// 1. Load items from list in articles in main block

const items = [
    {
        id: 1,
        title: "Набор деталей",
        price: 1,
        type: "сплав белокамня",
        image: "images/placeholder.png"
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
    },
    {
        id: 4,
        title: "Металоконструкции",
        price: 10,
        type: "сплавов белокамня"
    },
    {
        id: 5,
        title: "Энергетический модуль",
        price: 15,
        type: "сплава белокамня"
    },
    {
        id: 6
    }
]

const catalogue = document.querySelector(".CatalogueGrid");

items.forEach((item) => {
    // 1.1 Card layout
    const card = document.createElement("article");
    card.classList.add("ItemCard");

    const left_part = document.createElement("div");
    left_part.classList.add("TextPart");
    card.append(left_part);

    const image_part = document.createElement("img");
    image_part.classList.add("ImagePart");
    card.append(image_part);

    catalogue.append(card);

    // 1.2 Card elements
    // 1.2.1 Text part
    const title = document.createElement("h3");
    title.textContent = item.title || "В процессе добавления";
    left_part.append(title);

    const price = document.createElement("p");
    price.classList.add("ItemPrice");
    if (item.price === undefined || item.type === undefined) {
        price.textContent = "Цена уточняется";
    } else {
        price.textContent = `Цена: ${item.price} ${item.type}`;
    }
    left_part.append(price);

    // 1.2.2 Buttons
    const controls = document.createElement("div");
    controls.classList.add("QuantityControls");
    left_part.append(controls);

    const minus_button = document.createElement("button");
    minus_button.type = "button";
    minus_button.classList.add("MinusButton");
    minus_button.dataset.id = item.id;
    minus_button.textContent = "−";
    controls.append(minus_button);

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("BuyButton");
    button.dataset.id = item.id;
    button.textContent = "Добавить в корзину";
    controls.append(button);

    const plus_button = document.createElement("button");
    plus_button.type = "button";
    plus_button.classList.add("PlusButton");
    plus_button.dataset.id = item.id;
    plus_button.textContent = "+";
    controls.append(plus_button);

    // 1.3.67
    image_part.src = item.image || "images/placeholder.png";
});



// 2. Cart & buttons

const cart_count = document.querySelector("#cart-count");
const add_buttons = document.querySelectorAll(".BuyButton");
let count = 0;

function addToCart(event) {
    const button = event.target;
    const controls = button.parentElement;
    controls.classList.add("IsAdded");

    const selected_item = items.find((item) => { return item.id == button.dataset.id; });
    count = count + selected_item.price;
    cart_count.textContent = count;
    button.textContent = "Добавлено";
}

add_buttons.forEach((button) => { button.addEventListener("click", addToCart); });



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
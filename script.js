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
    minus_button.addEventListener("click", minusItem);

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("BuyButton");
    button.dataset.id = item.id;
    button.textContent = "Добавить в корзину";
    controls.append(button);
    button.addEventListener("click", addToCart);

    const plus_button = document.createElement("button");
    plus_button.type = "button";
    plus_button.classList.add("PlusButton");
    plus_button.dataset.id = item.id;
    plus_button.textContent = "+";
    controls.append(plus_button);
    plus_button.addEventListener("click", plusItem);

    // 1.3.67
    image_part.src = item.image || "images/placeholder.png";
});



// 2. Cart & buttons

const cart_counter = document.querySelector("#cart-count");
let items_count = 0;
let items_price = 0;

function plusItem(event) {
    const selected_item = items.find((item) => { return item.id == event.target.dataset.id; });

    items_count = items_count + 1;
    cart_counter.textContent = items_count;
    items_price = items_price + selected_item.price;
}

function addToCart(event) {
    const button = event.target;
    button.parentElement.classList.add("IsAdded");

    const selected_item = items.find((item) => { return item.id == button.dataset.id; });
    items_count = items_count + 1;
    cart_counter.textContent = items_count;
    items_price = items_price + selected_item.price;
    button.textContent = "Добавлено";
}

function minusItem(event) {
    const selected_item = items.find((item) => { return item.id == event.target.dataset.id; });

    items_count = items_count - 1;
    cart_counter.textContent = items_count;
    items_price = items_price - selected_item.price;
}



// 3. Cart window

const open_button = document.querySelector("#open-cart");
const close_button = document.querySelector("#close-cart");
const cart = document.querySelector("#cart");
const cart_price = document.querySelector("#cart-price");

open_button.addEventListener("click", () => {
    cart.showModal();
    cart_price.textContent = items_price;
});

close_button.addEventListener("click", () => {
    cart.close();
});

// 4. Extra

const adresess = [
    "Кратер N-ый",
    "Линия терминатора"
]

const adress_list = document.querySelector("#adress-list")

adresess.forEach((adres) => {
    const option = document.createElement("option");
    option.textContent = adres;
    adress_list.append(option);
});
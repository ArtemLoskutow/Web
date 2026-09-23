// 67. SIKSEVAN

let cart_items = [];

function saveCart() { localStorage.setItem("shop-cart", JSON.stringify(cart_items) ); }

function loadCart() {
    const saved_cart = localStorage.getItem("shop-cart");
    if (saved_cart === null) { return; }
    cart_items = JSON.parse(saved_cart);
}

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
    card.dataset.id = item.id;
    catalogue.append(card);

    const left_part = document.createElement("div");
    left_part.classList.add("TextPart");
    card.append(left_part);

    const image_part = document.createElement("img");
    image_part.classList.add("ImagePart");
    image_part.src = item.image || "images/placeholder.png";
    card.append(image_part);

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
    minus_button.addEventListener("click", () => { changeItemQuantity(item.id, -1); });

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
    plus_button.addEventListener("click", () => { changeItemQuantity(item.id, 1); });

    // 1.2.3 Extra
    if (item.price === undefined || item.type === undefined) {
        button.disabled = true;
        button.textContent = "В процессе добавления";
    }
});



// 2. Cart & buttons

const cart_counter = document.querySelector("#cart-count");
function updateItemsQuantity() {
    let items_count = 0;
    cart_items.forEach(item => items_count += item.quantity);
    cart_counter.textContent = items_count;
}

function updateItemControls(item_id) {
    const card = document.querySelector(`.ItemCard[data-id="${item_id}"]`);
    const controls = card.querySelector(".QuantityControls");
    const buy_button = card.querySelector(".BuyButton");

    const cart_item = cart_items.find(item => item.id == item_id);

    if (cart_item === undefined) {
        controls.classList.remove("IsAdded");
        buy_button.textContent = "Добавить в корзину";
        return;
    }
    controls.classList.add("IsAdded");
    buy_button.textContent = `В корзине: ${cart_item.quantity}`;
}

function addToCart(event) { changeItemQuantity(event.target.dataset.id, 1); }

function changeItemQuantity(id, quantity) {
    const changed_item = cart_items.find(item => item.id == id);
    if (changed_item == undefined) {
        if (quantity < 0) { return; }

        cart_items.push({ id: id, quantity: quantity });
    } else if ((changed_item.quantity + quantity) <= 0) {
        cart_items = cart_items.filter(item => item.id != id);
    } else { changed_item.quantity += quantity; }

    saveCart();
    updateItemControls(id);
    updateItemsQuantity();
}



// 3. Cart window

const open_button = document.querySelector("#open-cart");
const close_button = document.querySelector("#close-cart");
const cart = document.querySelector("#cart");
const cart_price = document.querySelector("#cart-price");

open_button.addEventListener("click", () => {
    cart.showModal();
    let items_price = 0;
    cart_items.forEach(item => items_price += items.find(listed_item => listed_item.id == item.id).price * item.quantity);
    cart_price.textContent = items_price;
});

close_button.addEventListener("click", () => {
    cart.close();
});



// 4. Extra

const addresess = [
    "Кратер N-ый",
    "Линия терминатора"
]

const address_list = document.querySelector("#address-list")

addresess.forEach((addres) => {
    const option = document.createElement("option");
    option.textContent = addres;
    address_list.append(option);
});

loadCart();
updateItemsQuantity();

cart_items.forEach((item) => {
    updateItemControls(item.id);
});
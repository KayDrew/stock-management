
export{};

// Select elements 
const navButton = document.querySelector("#nav") as HTMLButtonElement | null;
const addSection = document.querySelector(".addSection") as HTMLElement | null;
const addButton = document.querySelector(".addStock") as HTMLButtonElement | null;
const removeSection = document.querySelector(".removeStock") as HTMLElement | null;
const shipButton = document.querySelector(".itemShipped") as HTMLButtonElement | null;
const product1Quantity = document.querySelector(".prod1Quantity") as HTMLElement | null;
const product2Quantity = document.querySelector(".prod2Quantity") as HTMLElement | null;
const product3Quantity = document.querySelector(".prod3Quantity") as HTMLElement | null;
const productPrice1 = document.querySelector(".productPrice1") as HTMLElement | null;
const productPrice2 = document.querySelector(".productPrice2") as HTMLElement | null;
const productPrice3 = document.querySelector(".productPrice3") as HTMLElement | null;


let product1Stock: number = Number(document.querySelector(".prod1Quantity")?.getAttribute("value")) || 0;
let product2Stock: number = Number(document.querySelector(".prod2Quantity")?.getAttribute("value")) || 0;
let product3Stock: number = Number(document.querySelector(".prod3Quantity")?.getAttribute("value")) || 0;
let prod1Price: number = Number(document.querySelector(".productPrice1")?.getAttribute("value")) || 0;
let prod2Price: number = Number(document.querySelector(".productPrice2")?.getAttribute("value")) || 0;
let prod3Price: number = Number(document.querySelector(".productPrice3")?.getAttribute("value")) || 0;

// Object to track client orders
let clientOrders: { [email: string]: string } = {};


navButton?.addEventListener("click", displayOptions);
addButton?.addEventListener("click", addStock);
shipButton?.addEventListener("click", removeStock);

// Function to toggle stock sections
function displayOptions(this: HTMLButtonElement): void {
    if (this.value === "Remove Stock") {
        this.style.background = "green";
        this.value = "Add Stock";
        this.innerText = "Add Stock";
        if (removeSection) removeSection.style.display = "block";
        if (addSection) addSection.style.display = "none";
    } else {
        this.style.background = "red";
        this.value = "Remove Stock";
        if (addSection) addSection.style.display = "block";
        if (removeSection) removeSection.style.display = "none";
        this.innerText = "Remove Stock";
    }
}

// Function to add stock
function addStock(): void {
    let productName = (document.querySelector("#addProductCode") as HTMLInputElement)?.value || "";
    let itemsReceived = Number((document.querySelector("#itemsReceived") as HTMLInputElement)?.value) || 0;
    let pricePerItem = Number((document.querySelector("#pricePerItem") as HTMLInputElement)?.value) || 0;

    if (itemsReceived > 0 && pricePerItem > 0) {
        if (productName === "productName1") {
            product1Stock += itemsReceived;
            if (product1Quantity) product1Quantity.innerText = product1Stock.toString();
            prod1Price = avgPricePerItem(prod1Price, pricePerItem);
            if (productPrice1) productPrice1.innerText = prod1Price.toFixed(2);
        } else if (productName === "productName2") {
            product2Stock += itemsReceived;
            if (product2Quantity) product2Quantity.innerText = product2Stock.toString();
            prod2Price = avgPricePerItem(prod2Price, pricePerItem);
            if (productPrice2) productPrice2.innerText = prod2Price.toFixed(2);
        } else {
            product3Stock += itemsReceived;
            if (product3Quantity) product3Quantity.innerText = product3Stock.toString();
            prod3Price = avgPricePerItem(prod3Price, pricePerItem);
            if (productPrice3) productPrice3.innerText = prod3Price.toFixed(2);
        }
    } else {
        alert("Please, enter an amount above zero for both stock and price");
    }
}

// Function to remove stock after purchase
function removeStock(): void {
    let buyerEmail = (document.querySelector("#buyerEmail") as HTMLInputElement)?.value || "";

    if (buyerEmail.length > 3) {
        if (clientOrders.hasOwnProperty(buyerEmail)) {
            alert("Sorry, you can only make one purchase.");
            return;
        }

        let productName = (document.querySelector("#removeProductCode") as HTMLInputElement)?.value || "";
        let itemsBought = Number((document.querySelector("#itemsBought") as HTMLInputElement)?.value) || 0;

        if (itemsBought > 0) {
            if (productName === "productName1") {
                if (product1Stock >= itemsBought) {
                    product1Stock -= itemsBought;
                    if (product1Quantity) product1Quantity.innerText = product1Stock.toString();
                    clientOrders[buyerEmail] = productName;
                } else {
                    alert("Not enough stock on hand");
                }
            } else if (productName === "productName2") {
                if (product2Stock >= itemsBought) {
                    product2Stock -= itemsBought;
                    if (product2Quantity) product2Quantity.innerText = product2Stock.toString();
                    clientOrders[buyerEmail] = productName;
                } else {
                    alert("Not enough stock on hand");
                }
            } else {
                if (product3Stock >= itemsBought) {
                    product3Stock -= itemsBought;
                    if (product3Quantity) product3Quantity.innerText = product3Stock.toString();
                    clientOrders[buyerEmail] = productName;
                } else {
                    alert("Not enough stock on hand");
                }
            }
        } else {
            alert("Please, enter an amount above zero");
        }
    } else {
        alert("Please, enter a valid buyer email.");
    }
}

// Function to calculate average price per item
function avgPricePerItem(oldPrice: number, itemPrice: number): number {
    return (oldPrice + itemPrice) / 2;
}
import { menuArray } from './data.js';

const oderableItems = document.getElementById('oderable-items');
const everything = document.getElementById('everything');
const purchaseBtn = document.getElementById('purchase-btn');
const cardDetails = document.getElementById('card-details');
const cardDetailsForm = document.getElementById('card-details-form');
const ordersSection = document.getElementById('orders');
const lastTextContainer = document.getElementById('last-text-container');
const lastText = document.getElementById('last-text');
const paymentBtn = document.getElementById('payment-btn');

// Array to store selected orders
let selectedOrders = [];

// Event Listeners
document.addEventListener('click', function (e) {
    if (e.target.dataset.id) {
        handleAddOrder(e.target.dataset.id);
    }
    if (e.target.classList.contains('remove-btn')) {
        handleRemoveOrder(e.target.dataset.index);
    }
    if (e.target.id === 'purchase-btn') {
        handlePurchase();
    }
});
document.getElementById("card-details-form").addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    
    cardDetails.style.display = 'none';
    ordersSection.style.display = 'none';
    everything.style.display = 'none'; // Hide the order list

    // Display a thank-you message
    lastTextContainer.style.display = 'block';
    lastText.innerHTML = `<h4>Thanks ${name}, your order is on its way!<h4>`;
});


// Render the menu items
renderOrderItem(menuArray);

// Function to render the menu items
function renderOrderItem(items) {
    let itemsHtml = '';
    items.forEach((item) => {
        const { name, ingredients, id, price, emoji } = item;
        itemsHtml += `
        <div class="item">
            <div class="container">
                <p class="item-graphic">${emoji}</p>
                <div class="labelling">
                    <h2 class="item-title">${name}</h2>
                    <p class="item-description">${ingredients.join(', ')}</p>
                    <h3 class="item-price">$${price}</h3>
                </div>
                <button class="add-btn" id="add-btn" data-id="${id}">+</button>
            </div>
        </div>`;
    });
    oderableItems.innerHTML = itemsHtml;
}

// Function to handle adding an order
function handleAddOrder(orderId) {
    const targetOrderObj = menuArray.find((item) => item.id === Number(orderId));
    selectedOrders.push(targetOrderObj);
    renderOrderList();
}

// Function to handle removing an order
function handleRemoveOrder(index) {
    selectedOrders.splice(index, 1);
    renderOrderList();
}

// Function to render the order list and total price
function renderOrderList() {
    let orderHtml = '';
    let totalPrice = 0;

    selectedOrders.forEach((order, index) => {
        const { name, price } = order;
        totalPrice += price;
        orderHtml += `
        <div class="ordered" id="ordered">
            <div class="oredered-html">
                <div class="order-text">
                    <h2>${name}</h2>
                    <div class="remove-btn-container">
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
                <div class="order-price">$${price}</div>
            </div>
        </div>
        <hr class="line-after-ordering">`;
    });

    // Display orders and total price
    everything.innerHTML = `
        ${orderHtml}
        <div class="totaling">
            <p>Total price:</p>
            <p>$${totalPrice}</p>
        </div>`;

    // Show or hide the purchase button
    purchaseBtn.style.display = selectedOrders.length > 0 ? 'block' : 'none';
}

// Function to handle purchase button click
function handlePurchase() {
    cardDetails.style.display = 'block';
    lastTextContainer.style.display = 'none'; // Ensure thank you message is hidden
}

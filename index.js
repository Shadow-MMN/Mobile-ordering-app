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

let selectedOrders = [];

// Event delegation
document.addEventListener('click', function (e) {
    if (e.target.dataset.id) {
        handleAddOrder(e.target.dataset.id);
    } else if (e.target.classList.contains('remove-btn')) {
        handleRemoveOrder(e.target.dataset.index);
    } else if (e.target.id === 'purchase-btn') {
        handlePurchase();
    }
});

paymentBtn.addEventListener('click', function (e) {
    e.preventDefault();
    handlePayment();
});

// Render menu items
function renderOrderItem(items) {
    const itemsHtml = items.map((item) => {
        const { name, ingredients, id, price, emoji } = item;
        return `
        <div class="item">
            <div class="container">
                <p class="item-graphic">${emoji}</p>
                <div class="labelling">
                    <h2 class="item-title">${name}</h2>
                    <p class="item-description">${ingredients.join(', ')}</p>
                    <h3 class="item-price">$${price}</h3>
                </div>
                <button class="add-btn" data-id="${id}">+</button>
            </div>
        </div>`;
    }).join('');
    oderableItems.innerHTML = itemsHtml;
}

// Add order
function handleAddOrder(orderId) {
    const targetOrderObj = menuArray.find((item) => item.id === Number(orderId));
    if (targetOrderObj) {
        selectedOrders.push(targetOrderObj);
        renderOrderList();
    }
}

// Remove order
function handleRemoveOrder(index) {
    if (index >= 0 && index < selectedOrders.length) {
        selectedOrders.splice(index, 1);
        renderOrderList();
    }
}

// Render selected orders
function renderOrderList() {
    const orderHtml = selectedOrders.map((order, index) => {
        const { name, price } = order;
        return `
        <div class="ordered">
            <div class="ordered-html">
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
    }).join('');

    const totalPrice = selectedOrders.reduce((acc, order) => acc + order.price, 0);

    everything.innerHTML = `
        ${orderHtml}
        <div class="totaling">
            <p>Total price:</p>
            <p>$${totalPrice}</p>
        </div>`;

    purchaseBtn.style.display = selectedOrders.length > 0 ? 'block' : 'none';
}

// Handle purchase
function handlePurchase() {
    cardDetails.style.display = 'block';
    lastTextContainer.style.display = 'none';
}

// Handle payment
function handlePayment() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value;

    cardDetails.style.display = 'none';
    ordersSection.style.display = 'none';
    everything.style.display = 'none';

    lastTextContainer.style.display = 'block';
    lastText.innerHTML = `<h4>Thanks ${name}, your order is on its way!</h4>`;
}

// Initial rendering of menu items
renderOrderItem(menuArray);

async function fetchCartData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889');
        const data = await response.json();

        const product = data.items.find(item => item.title.toLowerCase() === 'asgaard sofa');

        if (product) {
            renderCartTableRow(product);
            calculateCartTotals(data.items);
        } else {
            console.error('Product not found in the API data.');
        }
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}

function renderCartTableRow(product) {
    const cartItemsList = document.getElementById('cart-items-list');

    cartItemsList.innerHTML = '';

    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${product.image}" alt="${product.title}" class="cart-item-image"></td>
        <td>${product.title}</td>
        <td>₹${(product.price / 100).toFixed(2)}</td>
        <td>
            <button class="decrement-btn" data-id="${product.id}">-</button>
            <span class="quantity">${product.quantity}</span>
            <button class="increment-btn" data-id="${product.id}">+</button>
        </td>
        <td class="product-total">₹${((product.price / 100) * product.quantity).toFixed(2)}</td>
    `;

    cartItemsList.appendChild(row);

    const incrementBtn = row.querySelector('.increment-btn');
    const decrementBtn = row.querySelector('.decrement-btn');
    incrementBtn.addEventListener('click', () => updateQuantity(product, 1));
    decrementBtn.addEventListener('click', () => updateQuantity(product, -1));
}

function updateQuantity(product, delta) {
    product.quantity += delta;

    if (product.quantity < 1) {
        product.quantity = 1;
    }

    const productTotalCell = document.querySelector('.product-total');
    productTotalCell.innerHTML = `₹${((product.price / 100) * product.quantity).toFixed(2)}`;

    const quantitySpan = document.querySelector('.quantity');
    quantitySpan.innerHTML = product.quantity;

    calculateCartTotals([product]);
}

function calculateCartTotals(cartItems) {
    let subtotal = 0;

    cartItems.forEach(item => {
        subtotal += (item.price / 100) * item.quantity;
    });

    const total = subtotal;

    document.getElementById('cart-subtotal').innerHTML = `Subtotal: ₹${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').innerHTML = `Total: ₹${total.toFixed(2)}`;
}

function renderDeleteButton(cartItems) {
    const deleteButtonContainer = document.getElementById('delete-button-container');

    deleteButtonContainer.innerHTML = '';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete All Items';
    deleteButton.className = 'delete-btn';

    deleteButton.addEventListener('click', () => {
        cartItems.length = 0;
        renderCart(cartItems);
        calculateCartTotals(cartItems);
    });

    deleteButtonContainer.appendChild(deleteButton);
}

document.addEventListener('DOMContentLoaded', fetchCartData);

function toggleSearch() {
    var searchIcon = document.getElementById('search-icon');
    var searchInput = document.getElementById('search-input');

    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'inline-block';
        searchIcon.style.display = 'none';
    } else {
        searchInput.style.display = 'none';
        searchIcon.style.display = 'inline-block';
    }
}

document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let searchQuery = this.value.toLowerCase();  
        let container = document.querySelector('.cart-main');  

        container.innerHTML = '';

        let results = items.filter(item => item.toLowerCase().includes(searchQuery));

        if (results.length > 0) {
            container.innerHTML = `Found: ${results.join(', ')}`;
        } else {
            container.innerHTML = 'No item found';
        }        

        this.value = '';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");

    hamburger.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
});

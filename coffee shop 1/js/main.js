// Element references
let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItem = document.querySelector('.cart-items-container');

// Toggle navbar
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

// Toggle search bar
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
};

// Toggle cart
document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
};

// Remove overlays on scroll
window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

// Handle "Add to Cart" buttons for menu section
document.querySelectorAll('.menu .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        let parentBox = e.target.closest('.box');
        addToCartFromBox(parentBox);
    });
});

// Handle "Add to Cart" via shopping cart icon in products section
document.querySelectorAll('.products .fa-shopping-cart').forEach(icon => {
    icon.addEventListener('click', (e) => {
        let parentBox = e.target.closest('.box');
        addToCartFromBox(parentBox);
    });
});

// Function to extract data and add item to cart
function addToCartFromBox(box) {
    let imgSrc = box.querySelector('img').src;
    let title = box.querySelector('h3')?.innerText || "Coffee Item";
    let price = box.querySelector('.price')?.innerText || "$15.99";

    let newCartItem = document.createElement('div');
    newCartItem.classList.add('cart-item');
    newCartItem.innerHTML = `
        <span class="fas fa-times"></span>
        <img src="${imgSrc}" alt="">
        <div class="content">
            <h3>${title}</h3>
            <div class="price">${price}</div>
        </div>
    `;

    newCartItem.querySelector('.fa-times').onclick = () => {
        newCartItem.remove();
    };

    cartItem.insertBefore(newCartItem, cartItem.querySelector('.btn'));
}

// Remove functionality for existing items
document.querySelectorAll('.cart-item .fa-times').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.remove();
    });
});

// Handle checkout
document.querySelector('.cart-items-container .btn').addEventListener('click', (e) => {
    e.preventDefault();

    const items = document.querySelectorAll('.cart-item');

    if (items.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert("Thank you for your purchase! Your order is being processed.");

    items.forEach(item => item.remove());
});

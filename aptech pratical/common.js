let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const checkoutCartItems = document.getElementById('checkoutCartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutCartTotal = document.getElementById('checkoutCartTotal');
    const cartCount = document.getElementById('cartCount');
    
    if (!cartCount) return; // If cartCount element doesn't exist on the page
    
    cartItems.innerHTML = '';
    if (checkoutCartItems) checkoutCartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.product} - Rs.${item.price}</span>
            <button class="remove-button" data-index="${index}" data-type="cart">Remove</button>
        `;
        cartItems.appendChild(div);

        if (checkoutCartItems) {
            const checkoutDiv = document.createElement('div');
            checkoutDiv.className = 'cart-item';
            checkoutDiv.innerHTML = `<span>${item.product} - Rs.${item.price}</span>`;
            checkoutCartItems.appendChild(checkoutDiv);
        }

        total += item.price;
    });

    if (cartTotal) {
        cartTotal.textContent = cart.length > 0 ? `Total: Rs.${total.toFixed(2)}` : 'Your cart is empty.';
    }
    if (checkoutCartTotal) {
        checkoutCartTotal.textContent = cart.length > 0 ? `Total: Rs.${total.toFixed(2)}` : 'Your cart is empty.';
    }
    cartCount.textContent = cart.length;

    document.querySelectorAll('.remove-button[data-type="cart"]').forEach(button => {
        button.removeEventListener('click', handleRemoveFromCart);
        button.addEventListener('click', handleRemoveFromCart);
    });
}

function handleRemoveFromCart(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function setupWishlistRemoveListeners() {
    document.querySelectorAll('.remove-button').forEach(button => {
        button.removeEventListener('click', handleRemoveFromWishlist);
        button.addEventListener('click', handleRemoveFromWishlist);
    });
}

function handleRemoveFromWishlist(e) {
    const productId = e.target.getAttribute('data-product-id');
    wishlist = wishlist.filter(item => item !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    document.getElementById(`wish${productId}`).remove();
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) wishlistCount.textContent = wishlist.length;
}
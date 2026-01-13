let cart = [];

// Select Elements
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItemsDiv = document.getElementById('cart-items');
const viewCartBtn = document.getElementById('view-cart-btn');
const closeBtn = document.querySelector('.close-btn');

// Add to Cart Logic
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.parentElement;
        const bookName = card.getAttribute('data-name');
        const price = card.getAttribute('data-price');

        cart.push({ name: bookName, price: price });
        updateCartUI();
        
        // Simple Feedback Animation
        button.textContent = "Added!";
        setTimeout(() => button.textContent = "Add to Cart", 1000);
    });
});

function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <p><strong>${item.name}</strong> - $${item.price} 
            <button onclick="removeFromCart(${index})">❌</button></p>
        </div>
    `).join('');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Modal Control
viewCartBtn.onclick = () => cartModal.style.display = 'flex';
closeBtn.onclick = () => cartModal.style.display = 'none';

document.getElementById('checkout-btn').onclick = () => {
    const address = document.getElementById('user-address').value;
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else if (!address) {
        alert("Please enter a delivery address for the script delivery!");
    } else {
        alert(`Order confirmed for ${cart.length} items! Delivering to: ${address}`);
        cart = [];
        updateCartUI();
        cartModal.style.display = 'none';
    }
};


export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}

export const getCartProducts = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export const calculateSubtotal = (cartItems) => {
    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
    });
    return subtotal;
  };

export const clearCart = () => {
    // Implementacja czyszczenia koszyka w localStorage
};
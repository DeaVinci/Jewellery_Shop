

export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const updateQuantity = (productId, newQuantity) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.map(product => {
      if (product.id === productId) {
          return { ...product, quantity: newQuantity };
      }
      return product;
  });
  localStorage.setItem('cart', JSON.stringify(updatedCart));
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
  
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount);
};
  

export const clearCart = () => {

};
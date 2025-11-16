window.total = (cartItems) => {
  return cartItems.reduce((prev, val, i) => prev + (window.foodPrices[i] * val), 0).toFixed(2);
};

window.reciept = (cartItems) => {
  return `${cartItems.map((a, i) => (a == 0 ? null : `${a}x ${window.food[i]} | \$${(window.foodPrices[i]*a).toFixed(2)} `)).filter(a => { return a != null; }).join('\n')}


Total: \$${window.total(cartItems)}`;
};

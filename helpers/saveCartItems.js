const saveCartItems = (itemsInCart) => {
  localStorage.setItem("cartItem", itemsInCart);
};

if (typeof module !== "undefined") {
  module.exports = saveCartItems;
}

export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    productQuantity: 2,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    productQuantity: 1,
    deliveryOptionId: "2",
  },
];
function saveToCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.productQuantity++;
  } else {
    cart.push({
      productId: productId,
      productQuantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveToCart();
}

export function removeFromCart(productId) {
  const newCart = [];
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    } else {
      matchingItem = cartItem;
    }
    cart = newCart;
  });
  saveToCart();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.productQuantity;
  });
  return cartQuantity;
}
export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.productQuantity = newQuantity;
    }
  });

  saveToCart();
}

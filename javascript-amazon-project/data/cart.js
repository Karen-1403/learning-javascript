export const cart = [];
function addToCart(productId) {
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
    });
  }
}

import { isValidDeliveryOption } from "./deliveryOptions.js";
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
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
    },
    saveToCart() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    addToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      if (matchingItem) {
        matchingItem.productQuantity++;
      } else {
        this.cartItems.push({
          productId: productId,
          productQuantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.saveToCart();
    },
    removeFromCart(productId) {
      const newCart = [];
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
          newCart.push(cartItem);
        } else {
          matchingItem = cartItem;
        }
        this.cartItems = newCart;
      });
      this.saveToCart();
    },
    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.productQuantity;
      });
      return cartQuantity;
    },
    updateQuantity(productId, newQuantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          cartItem.productQuantity = newQuantity;
        }
      });

      this.saveToCart();
    },
    updateDeliveryOption(productId, deliveryOptionId) {
      if (!isValidDeliveryOption(deliveryOptionId)) {
        return;
      }
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      if (!matchingItem) {
        return;
      }
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToCart();
    },
  };
  return cart;
}
const cart = Cart("cart-oop");
cart.loadFromStorage();
const businessCart = Cart("cart-business");
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

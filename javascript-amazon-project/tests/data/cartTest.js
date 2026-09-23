import { cart } from "../../data/cart-class.js";

describe("Test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("adding an existing item to cart", () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        productQuantity: 1,
        deliveryOptionId: "1",
      },
    ];
    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );
    expect(cart.cartItems[0].productQuantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productQuantity: 2,
          deliveryOptionId: "1",
        },
      ]),
    );
  });

  it("adding a new item to cart", () => {
    cart.cartItems = [];
    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );
    expect(cart.cartItems[0].productQuantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productQuantity: 1,
          deliveryOptionId: "1",
        },
      ]),
    );
  });
});

describe("Test suite: removeFromCart", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    cart.cartItems = [
      {
        productId: productId1,
        productQuantity: 1,
        deliveryOptionId: "1",
      },
      {
        productId: productId2,
        productQuantity: 1,
        deliveryOptionId: "2",
      },
    ];
  });
  it("removes an existing item from the cart", () => {
    cart.removeFromCart(productId1);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId2,
          productQuantity: 1,
          deliveryOptionId: "2",
        },
      ]),
    );
  });

  it("does nothing if product is not in the cart", () => {
    cart.removeFromCart("non-existing-product-id");
    expect(cart.cartItems.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId1,
          productQuantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          productQuantity: 1,
          deliveryOptionId: "2",
        },
      ]),
    );
  });
});

describe("Test suite: updateDeliveryOption", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("updates the delivery option", () => {
    cart.cartItems = [
      {
        productId: productId1,
        productQuantity: 1,
        deliveryOptionId: "1",
      },
    ];
    cart.updateDeliveryOption(productId1, "2");
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].productQuantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("2");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId1,
          productQuantity: 1,
          deliveryOptionId: "2",
        },
      ]),
    );
  });

  it("does nothing if product is not in the cart", () => {
    cart.cartItems = [
      {
        productId: productId1,
        productQuantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.updateDeliveryOption("does not exist", "2");
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].productQuantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});

import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("adding an existing item to cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productQuantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].productQuantity).toEqual(2);
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
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].productQuantity).toEqual(1);
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
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });
    loadFromStorage();
  });
  it("removes an existing item from the cart", () => {
    removeFromCart(productId1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
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
    removeFromCart("non-existing-product-id");
    expect(cart.length).toEqual(2);
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
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          productQuantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    updateDeliveryOption(productId1, "2");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].productQuantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("2");
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
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          productQuantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    updateDeliveryOption("does not exist", "2");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].productQuantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkout.js";

import { loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
/*
async function loadPage() {
  try {
    //throw 'Error';

    await loadProductsFetch();
    /*await new Promise((resolve, reject) => {
      //throw 'Error';
      loadCartFetch(() => {
        //reject('Error');
        resolve();
      });
    });
    await loadCartFetch();
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();
*/

Promise.all([loadProductsFetch(), loadCartFetch()]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
*/
/*loadProducts(() => {
    loadCart(() => {
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  
});*/

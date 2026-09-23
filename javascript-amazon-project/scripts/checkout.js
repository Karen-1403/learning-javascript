import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkout.js";

import { loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import { loadCart } from "../data/cart.js";

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
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

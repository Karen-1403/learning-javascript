import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkout.js";

import { loadProducts } from "../data/products.js";

loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

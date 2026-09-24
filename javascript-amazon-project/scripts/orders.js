import { orders } from "../data/orders.js";
import { products, loadProductsFetch, getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "./utils/money.js";
async function loadPage() {
  await loadProductsFetch();
  console.log(products[0]);

  let ordersHTML = "";

  orders.forEach((order) => {
    const orderDate = dayjs(order.orderTime);
    const orderDateString = orderDate.format("MMMM D");

    ordersHTML += `
<div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${renderOrderProducts(order)}
          </div>
        </div>
`;
    document.querySelector(".js-orders-grid").innerHTML = ordersHTML;

    function renderOrderProducts(order) {
      let orderGridHTML = "";

      order.products.forEach((product) => {
        const productItem = getProduct(product.productId);
        const productDeliveryDate = dayjs(product.estimatedDeliveryTime);
        const productDeliveryDateString = productDeliveryDate.format("MMMM D");
        orderGridHTML += `
<div class="product-image-container">
              <img src=${productItem.image} />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${productItem.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${productDeliveryDateString}</div>
              <div class="product-quantity">Quantity: ${product.quantity}</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
      });
      return orderGridHTML;
    }
  });
}
loadPage();

import { getProduct, loadProductsFetch } from "../data/products.js";
import { getOrderById } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function renderTrackingPage() {
  await loadProductsFetch();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const cartItemId = url.searchParams.get("cartItemId");
  const product = getProduct(cartItemId);
  const order = getOrderById(orderId);

  function getPackageFromOrder(order, cartItemId) {
    let matchingProduct;
    order.products.forEach((product) => {
      if (product.productId === cartItemId) {
        matchingProduct = product;
      }
    });
    return matchingProduct;
  }
  const packageItem = getPackageFromOrder(order, cartItemId);
  const packageDateString = dayjs(packageItem.estimatedDeliveryTime).format(
    "MMMM D",
  );
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(packageItem.estimatedDeliveryTime);
  const percentProgress =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const packageHTML = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>
        <div class="delivery-date">Arriving on ${packageDateString}</div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">Quantity: ${packageItem.quantity}</div>

        <img
          class="product-image"
          src="${product.image}"
        />
        <div class="progress-labels-container">
          <div class="progress-label ${
            percentProgress < 50 ? "current-status" : ""
          }">
        Preparing
      </div>
          <div class="progress-label ${
            percentProgress >= 50 && percentProgress < 100
              ? "current-status"
              : ""
          }">
        Shipped
      </div>
          <div class="progress-label ${
            percentProgress >= 100 ? "current-status" : ""
          }">
        Delivered
      </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
      
`;
  document.querySelector(".js-order-tracking").innerHTML = packageHTML;
}
renderTrackingPage();

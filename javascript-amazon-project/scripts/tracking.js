import { getProduct, loadProductsFetch } from "../data/products.js";
import { getOrderById } from "../data/orders.js";

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
  const packageHTML = `<div class="delivery-date">Arriving on Monday, June 13</div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">Quantity: ${packageItem.quantity}</div>

        <img
          class="product-image"
          src="${product.image}"
        />
`;
  document.querySelector(".js-package-details").innerHTML = packageHTML;
}
renderTrackingPage();

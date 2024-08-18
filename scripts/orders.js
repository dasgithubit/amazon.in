import { orders } from "../data/order.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { currencyFormat } from "./utils/money.js";
import { addToCart } from "../data/cart.js";

console.log(orders);

let orderHtml = '';

async function loadPage() {

  await loadProductsFetch();

orders.forEach((order) => {

  const orderTimeString = dayjs(order.orderTime).format('MMMM DD');
  
    orderHtml += `

    <div class="order-container">
              
        <div class="order-header">

          <div class="order-header-left-section">

              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>

              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${currencyFormat(order.totalCostCents)}</div>
              </div>

          </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>

        </div>
              <div class="order-details-grid">
                ${productsListHTML(order)}
              </div>

      </div>

    `;

});

document.querySelector('.js-orders-grid').innerHTML = orderHtml;

document.querySelectorAll('.js-buy-again-button')
.forEach((button) => {

  button.addEventListener('click', () => {

      const productId = button.dataset.orderId;
      addToCart(productId, 1);

      button.innerHTML = 'Added';

      setTimeout(() => {
        button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);   
  });

});

const cartQuantity = getOrderQuantity();
document.querySelector('.js-cartQuantity').innerHTML = cartQuantity;

document.querySelector('.js-search-button')
    .addEventListener('click', () => {
        const search = document.querySelector('.js-search-bar').value;

        window.location.href = `amazon.html?search=${search}`;
    });

}

loadPage();


function productsListHTML(order) {

  let productsListHTML = '';

  if(!order.products || !Array.isArray(order.products)){
    console.warn(`order id has no products `);
    return '';
  }

  order.products.forEach((productDetails) => {

    const product = getProduct(productDetails.productId);

  productsListHTML += `

    <div class="product-image-container">
        <img src="${product.image}">
    </div>

    <div class="product-details">

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-delivery-date">
          Arriving on: ${
            dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
          }
        </div>

        <div class="product-quantity">
          Quantity: ${productDetails.quantity}
        </div>

        <button class="buy-again-button button-primary js-buy-again-button" data-order-id="${productDetails.productId}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>

    </div>

    <div class="product-actions">

        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>

    </div>
              
  `;

});

return productsListHTML;
  
}

function getOrderQuantity() {

  let cartQuantity = 0;

  

  orders.forEach((order) => {
    
    if(!order.products || !Array.isArray(order.products)) {
      console.error('order Id is not found');
      return '';
    }
    order.products.forEach((productDetails) => {
      cartQuantity += productDetails.quantity;
    })
  });
  
  return  cartQuantity;

}



console.log(orders);









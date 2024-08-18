import { loadProductsFetch, getProduct } from "../data/products.js";
import { getOrder } from "../data/order.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


async function loadPage() {

  await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    
    const order =  getOrder(orderId);
    const product =  getProduct(productId);

    let productDetails;

    order.products.forEach((orderDetails) => {
      if(orderDetails.productId === product.id) {
        productDetails = orderDetails;
      }

    });

    const currentTime = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

    // calculate the difference in milliseconds

    const timeElapsed = currentTime.diff(orderTime);
    const totalDuration = deliveryTime.diff(orderTime);


    const percentProgress = Math.floor(((timeElapsed)/(totalDuration))*100);
    console.log(percentProgress);

    const deliveredMessage = currentTime > deliveryTime ? 'Delivered on': 'Arriving on';


    const trackingHTML = 
    `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveredMessage} ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM DD')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">

          <div class="progress-label ${
            percentProgress < 50 ? 'current-status' : ''
          }">
            Preparing
          </div>
          <div class="progress-label ${
            (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
          }">
            Shipped
          </div>
          <div class="progress-label ${
            percentProgress >= 100 ? "current-status" : ''
          }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
      </div>
    `;

    document.querySelector('.js-main').innerHTML = trackingHTML;

}

loadPage();


import { loadProductsFetch, getProduct, products } from "../data/products.js";
import { getOrder } from "../data/order.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



async function loadPage() {

    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);
    console.log(order);

    let productDetails;
    order.products.forEach((orderDetails) => {
        if(orderDetails.productId === productId){
            productDetails = orderDetails;
        }
    });

    const trackingHTML = 
    `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM DD')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `

    document.querySelector('.js-main').innerHTML = trackingHTML;

}

loadPage();


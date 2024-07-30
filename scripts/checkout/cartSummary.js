import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products } from "../../data/products.js";
import {currencyFormat} from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions,getDelivery,calculateDeliveryDate} from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import {renderPaymentSummary} from "./paymentSummary.js"
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderCartSummary() {

      let cartHtmlSummary = '';

      cart.forEach((cartItem) => {

        let productId = cartItem.productId;

        const matchingItem = getProduct(productId);

        const deliveryId = cartItem.deliveryOptionId;

        const deliveryOption = getDelivery(deliveryId);
        
        const formatDate = calculateDeliveryDate(deliveryOption);
        
        cartHtmlSummary += `

        <div class="cart-item-container js-cart-container js-cart-container-${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: ${formatDate}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingItem.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">
                ${(currencyFormat(matchingItem.priceCents))}
              </div>
              <div class="product-quantity js-product-quantity-${matchingItem.id}">
                <span class="js-product-quantity ">
                  Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" 
                data-product-id = "${matchingItem.id}">
                  Update
                </span>
                <input class="quantity-input">
                <span class="save-quantity-link link-primary js-save-quantity-link"
                data-product-id = "${matchingItem.id}">
                  Save
                </span>
                <span class="delete-quantity-link link-primary 
                js-delete-quantity-link js-test-delete-${matchingItem.id}" data-product-id = "${matchingItem.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionHtml(matchingItem,cartItem)}
            </div>
          </div>
      </div>
        
        `;

      });


      // Insert the generated HTML into the DOM

      document.querySelector('.js-order-summary')
      .innerHTML = cartHtmlSummary;

      // Add event listeners to delete buttons

      document.querySelectorAll('.js-delete-quantity-link')
      .forEach((button) => {
          button.addEventListener('click', () => {
              const productId = button.dataset.productId;
              removeFromCart(productId);
              // updateCartQuantity();
            
          //Remove the item container from the DOM

              const container = document.querySelector(
                `.js-cart-container-${productId}`);

              if(container) {
                container.remove();
              }

              renderPaymentSummary();
              renderCheckoutHeader();
          });
          
      });

      // update the header of the checkout page checkout() as per the cart details
      // function updateCartQuantity() {

      //     const cartQuantity =  calculateCartQuantity();
      //     document.querySelector('.js-checkout-cart-quantity').innerHTML = `${cartQuantity} items`;
      // }

      // updateCartQuantity();


      document.querySelectorAll('.js-update-quantity-link')
      .forEach((updateButton) => {
        updateButton.addEventListener('click', () => {
            const productId = updateButton.dataset.productId;

            // cart item container (used for toggle)
            const container = document.querySelector(
              `.js-cart-container-${productId}`);
            container.classList.add('is-editing-quantity');

            // make the quantity and update disappear when enter the quantity
            const productQuantity = container.querySelector('.js-product-quantity');
            productQuantity.classList.add('js-hidden-quantity');

            const update = container.querySelector('.js-update-quantity-link');
            update.classList.add('js-hidden-update');

            renderCheckoutHeader();
            
          
        
          });

      });


      // save link
      document.querySelectorAll('.js-save-quantity-link')
      .forEach((saveButton) => {
        saveButton.addEventListener('click', () => {

          // Get the product ID from the data attribute of the save button
          const productId = saveButton.dataset.productId;

          // Find the container associated with the product ID
          const container = document.querySelector(
            `.js-cart-container-${productId}`);

            // container.remove('.is-editing-quantity');
            // getting the quantity value from the dom
            const quantityInput = container.querySelector('.quantity-input');
            const newQuantity = Number(quantityInput.value);

            if(newQuantity<0 && newQuantity>1000) {
              alert('Quantity must be at least 0 and less than 1000');
              return;  
            }

            // update the new quantity in the cart
            updateQuantity(productId,newQuantity);

            // update the quantity label
            const quantityLabel = container.querySelector('.js-quantity-label');
            quantityLabel.innerHTML = newQuantity;      

            // Hide input and save button, show quantity text and update button
          container.classList.remove('is-editing-quantity');
          quantityInput.value = ''; // Optionally clear the input field

          const productQuantity = container.querySelector('.js-product-quantity');
          productQuantity.classList.remove('js-hidden-quantity');

          const update = container.querySelector('.js-update-quantity-link');
          update.classList.remove('js-hidden-update');

          // use total cart Quantity where we updating the quantity
          renderCheckoutHeader();
          renderPaymentSummary();
      
        });

      });


      // dayjs external library

      // const todayDay = dayjs();
      // const deliveryDate = todayDay.add(7, 'days');
      // const formatDate = todayDay.format('dddd, MMMM D');
      // console.log(todayDay);
      // console.log(deliveryDate);
      // console.log(formatDate);


      function deliveryOptionHtml(matchingItem, cartItem) {

        let html = '';

          deliveryOptions.forEach((option) => {

            const formatDate = calculateDeliveryDate(option);
            
            const priceCents = option.priceCents === 0 ? 'Free' : `${currencyFormat(option.priceCents)} -`;

            const isChecked = (option.id === cartItem.deliveryOptionId) ? 'checked' : '';
            
              html += `
              <div class="delivery-option js-delivery-option"
              data-product-id="${matchingItem.id}" data-delivery-id="${option.id}">
                <input type="radio" ${isChecked}
                  class="delivery-option-input"
                  name="${matchingItem.id}">
                <div>
                  <div class="delivery-option-date">
                    ${formatDate}
                  </div>
                  <div class="delivery-option-price">
                    $${priceCents} Shipping
                  </div>
                </div>
              </div>
              `
          });

          return html;

      }

      document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
          element.addEventListener('click', () => {
      
              const productId = element.dataset.productId;
              const deliveryId = element.dataset.deliveryId;

              updateDeliveryOption(productId, deliveryId);
              renderCartSummary();
              renderPaymentSummary();
              renderCheckoutHeader();
          });
      });

    }

    renderCartSummary();



































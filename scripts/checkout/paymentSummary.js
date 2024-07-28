import {cart} from "../../data/cart.js"
import { getProduct } from "../../data/products.js"
import { getDelivery } from "../../data/deliveryOptions.js";
import { currencyFormat } from "../utils/money.js";

export function renderPaymentSummary() {

    let totalCartPrice = 0;
    let deliveryPrice = 0;
    cart.forEach((cartItem) => {

        const product = getProduct(cartItem.productId);
        totalCartPrice += product.priceCents * cartItem.quantity;

        const delivery = getDelivery(cartItem.deliveryOptionId);
        deliveryPrice += delivery.priceCents;


    });

    const totalPriceBeforeTax = totalCartPrice + deliveryPrice;
    const estimatedTax = totalPriceBeforeTax*0.1;
    const totalPrice = totalPriceBeforeTax + estimatedTax;


    const orderSummaryHtml =  `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${currencyFormat(totalCartPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${currencyFormat(deliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${currencyFormat(totalPriceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${currencyFormat(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${currencyFormat(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    ` 
    
    document.querySelector('.js-payment-summary')
    .innerHTML = orderSummaryHtml;
    renderPaymentSummary();

    
}

renderPaymentSummary();


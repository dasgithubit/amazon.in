import {renderCartSummary} from "./checkout/cartSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js"
import {renderCheckoutHeader} from "./checkout/checkoutHeader.js"
import { loadProduct } from "../data/products.js";
// import "../data/cart-class.js"
// import "../data/car.js"
// import "../data/backend-practice.js"

// I will be using the anonymous function the loadProduct

loadProduct(()=> {

    renderCartSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});



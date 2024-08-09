import { renderCartSummary } from "../../scripts/checkout/cartSummary.js";
import { loadFromStorage,cart } from "../../data/cart.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";
import { loadProductFetch } from "../../data/products.js";


describe('test suite: Order Summary', () => {

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";


    // jasmine also provide the done function to wait for the code to execute
    beforeAll( async() => {
        // loadProduct is asynchronous code it will send the msg to my backend but it won't wait
        // and it goes to the next line
        // By using await we can first execute the promises

        await loadProductFetch();
    });

    
    beforeEach( () => {

        spyOn(localStorage,'setItem');

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        <div class="js-checkout-header"></div>
        
    `;

    spyOn(localStorage,'getItem').and.callFake(() => {
        return JSON.stringify([
            {
                productId : productId1,
                quantity : 2,
                deliveryOptionId : '1'
            },
            {
                productId : productId2,
                quantity : 1,
                deliveryOptionId : '2'
            }
        ]);
    });

        loadFromStorage();

        renderCartSummary();

        renderPaymentSummary();
    });

    it('display order summary', () => {

        expect(document.querySelectorAll('.js-cart-container').length).toEqual(2);

        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

        expect(document.querySelector(`.js-product-Price-${productId1}`).innerText).toEqual('$10.90');

        expect(document.querySelector(`.js-product-Price-${productId2}`).innerText).toEqual('$20.95');
    });


    it('delete from cart', () => {

        document.querySelector(`.js-test-delete-${productId1}`).click();

        expect(document.querySelectorAll('.js-cart-container').length).toEqual(1);

        expect(document.querySelector(`.js-cart-container-${productId1}`)).toEqual(null);

        expect(document.querySelector(`.js-cart-container-${productId2}`)).not.toEqual(null);

        expect(cart[0].productId).toEqual(productId2);
        expect(cart.length).toEqual(1);

        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain('Intermediate Size Basketball');

        expect(document.querySelector(`.js-product-Price-${productId2}`).innerText).toEqual('$20.95');

        
    });

    // afterEach(() => {
    //     document.querySelector('.js-test-container').innerHTML = '';
    // })


    it('updating the delivery option', () => {

        document.querySelector(`.js-test-delivery-option-${productId1}-${3}`).click();
        expect(document.querySelector(`.js-delivery-option-${productId1}-${3}`).checked).toEqual(true);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);
        expect(document.querySelector(`.js-payment-summary`).innerText).toContain('14.98');
        expect(document.querySelector('.js-total-price').innerHTML).toEqual('63.50');
    });

});


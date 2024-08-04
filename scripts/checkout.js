import {renderCartSummary} from "./checkout/cartSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js"
import {renderCheckoutHeader} from "./checkout/checkoutHeader.js"
import { loadProduct } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js"
// import "../data/car.js"
// import "../data/backend-practice.js"

// Promises : It help us to wait the asynchronous code 
// It is flat and easy to understand likewise in the callBack there would be multiple indentation and it gets confusing
// Promises is a inbuilt class of the javaScript which has a similar function of jasmine done() => resolve()
// we pass parameter as a function to the promise
// resolve let the code to finished and then go to the next line
// if we do not call the resolve method then it wait infinitly
// resolve() help to go the next steps
// promises inner function run faster

//Now we our loading each promise simutaneously 
// with the help of Promise.all it wait for all of them to finish
// It takes a array of promises

Promise.all([
    new Promise((resolve) => {
    
        loadProduct(() => {
            
            // we can give a value to the resolve('value');
            resolve('hello');
        });
    
    }),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((value) => {
    console.log(value)
    renderCartSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

});


/*
new Promise((resolve) => {
    
    loadProduct(() => {
        
        // we can give a value to the resolve('value');
        resolve('hello');
    });

}).then((value) => {
    console.log(value);
    
    // we have to create a promise object to use the resolve method to go to the next steps
    
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    
    renderCartSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

});
*/

// promise has two feature it let response function to give a value and then function to pass a parameter   
    


// promise help us in the javaScript to run multiple code simultaneously as a thread

// I will be using the anonymous function to loadProduct

// callBack function create confusion and create more indentation


/*
loadProduct(()=> {
    console.log('product');

    loadCart(() => {
        renderCartSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    }); 
});
*/



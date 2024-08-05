import {renderCartSummary} from "./checkout/cartSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js"
import {renderCheckoutHeader} from "./checkout/checkoutHeader.js"
import { loadProductFetch } from "../data/products.js";
import { loadFetchCart } from "../data/cart.js";
// import "../data/cart-class.js"
// import "../data/car.js"
// import "../data/backend-practice.js"

// Promises: It is a built in class of a javaScript 
// It is used to handle the asynchronous code
// promises are flat and easy to read as compare to the callback
// callback it create lot of confusion because of the callback indentation
// promise also have a similar function like jasmine testing framework done() => response(), it is used once the asynchronous code is completed then go to the next step
// If we don't use the response() it won't go to the next step
// In promise there is another function then() to perform the next step 
// inside the response we can pass a value so the next step can have access to that value 
// we pass a function as a parameter inside the promise when creating the instance of the class promise
// Promises run the javaScript code simulaneously as a thread
// Promises also have feature Promise.all() to wait for the asynchronous code simultaneoulsy
// promise.all takes an array of promise 


// Better approach to handle the asynchronous code would be async await 
// Easy to read and less implemented setup code
// loadOrder will pause the execution until the loadProduct promise has been resolved
// This ensure that the other function will call once the product has been fetch 
// await can only be used inside the async function 

// practice the async await

async function name() {
    try{
        // we can create a default error 
        // throw 'error';

        await loadProductFetch();
        await loadFetchCart();
        console.log('hello');
    }
    catch(error) {
        console.log('error occured');
    }
}

name().then(() => {
    console.log('next step');
})



/*
async function loadData(){
    await loadProductFetch();
    await loadFetchCart();
    renderCartSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}

loadData();
*/



/*

Promise.all([

    loadProductFetch(),
    loadFetchCart(),
    

    // new Promise((resolve) => {
    
    //     loadProduct(() => {
    //         // we can give a value to the resolve('value');
    //         resolve('hello');
    //     });
    
    // }),

    // new Promise((resolve) => {
    //     loadCart(() => {
    //         resolve();
    //     });
    // })

]).then(() => {
    // console.log(value)
    renderCartSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

});
*/



// Inside promises we can use default by using throw
// if we want to provide error in the future then we can use reject function as a parameter to the promise

/*
new Promise((resolve, reject) => {
    // throw ('eror ocuured');
    loadProduct(() => {
        // reject('eror occured');
        
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



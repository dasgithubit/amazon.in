// Cart data inside the cart array 

import { validDeliveryOption } from "./deliveryOptions.js";

export let cart = [];

export function loadFromStorage() {

    cart = JSON.parse(localStorage.getItem('cart')) || [{

        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 2,
        deliveryOptionId : '1'
    },
    {
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity : 1,
        deliveryOptionId : '2'
    }];

}

loadFromStorage();



// localStorage is used to store the data permanently
function saveData() {
    localStorage.setItem('cart',JSON.stringify(cart));
}

// Add or update item in the cart

export function addToCart(productId, quantity) {

    let matchingItem;

    cart.forEach((cartItem) => {
        
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });


    if(matchingItem) {
        matchingItem.quantity += quantity;
    }

    else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }

    saveData();
    
}

// Remove item from the cart

export function removeFromCart(productId) {

    const updatedCart = [];

    cart.forEach((cartItem) => {

        if(cartItem.productId !== productId) {
            updatedCart.push(cartItem);
        }

    });

    cart = updatedCart;

    saveData();
    
}


export function updateQuantity(productId, newQuantity) {

    let matchingItem;

    cart.forEach((cartItem) => {

        if(cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    if(matchingItem) {
        matchingItem.quantity = newQuantity;
    }
    saveData(); 
}


export function calculateCartQuantity() {

    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryId) {

    if(!productId) {
        return;
    }

    if(!validDeliveryOption(deliveryId)) {
        return;
    }

    let matchingItem;
    
    cart.forEach((cartItem) => {
        
        if(productId === cartItem.productId) {
            matchingItem = cartItem;   
        }
    });

    if(matchingItem) {

        matchingItem.deliveryOptionId = deliveryId;
        saveData();
    }
}


export async function loadCartFetch() {

    try{
        const response = await fetch('https://supersimplebackend.dev/cart');

        if(!response.ok) {
            throw new Error('HTTPS error');
        }

        const content = response.headers.get('content-type');

        if(content && content.includes('application/json')) {
            const jsonData =  await response.json();
            console.log('Json data: ', jsonData);
        }

        else {
            const textData =  await response.text();
            console.log('Text data: ', textData);
        }

    } catch(error) {
        console.log('unexpected error!');
    }  
}



/*
export function loadFetchCart() {
    const promise = fetch('https://www.supersimplebackend.dev/cart').then((response) => {
        const content = response.headers.get('Content-Type');
        if(content && content.includes('application/json')){
            return response.json();
        }
        else {
            return response.text();
        }
    }).then((data) => {
        try{
            if( typeof data === 'String') {
                const parsedData =  JSON.parse(data);
                console.log(parsedData);
            }
            else {
                console.log(data);

            }
        }
        catch(error) {
            console.log('error occured ', error);
        }
    }).catch((error) => {
        console.log('Unexpected error occured', error);
    });

    return promise;
}

*/





/*
export function loadCart() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        const cartData = xhr.response;
        console.log(cartData);
    })
    xhr.open('GET', 'https://www.supersimplebackend.dev/cart');
    xhr.send();
    
}

loadCart();
*/


















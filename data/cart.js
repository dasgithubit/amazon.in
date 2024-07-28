// Cart data inside the cart array 

export let cart = JSON.parse(localStorage.getItem('cart')) || [{

        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 2,
        deliveryOptionId : '1'
    },
    {
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity : 1,
        deliveryOptionId : '2'
    }];



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

    let matchingItem;

    cart.forEach((cartItem) => {
        
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryId;

    saveData();

}















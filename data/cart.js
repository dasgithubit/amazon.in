// Cart data inside the cart array 

export let cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2
},
{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1
}];


// Generate html page 



export function addToCart(productId, quantity) {

    let matchingItem;

    cart.forEach((cartItem) => {
        
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });


    if(matchingItem) {
        matchingItem.quantity+= quantity;
    }

    else {
        cart.push({
            productId,
            quantity
        });
    }
}


export function currencyFormat(priceCents) {

    return (priceCents/100).toFixed(2);
}


export function removeFromCart(productId) {

    const updatedCart = [];

    cart.forEach((cartItem) => {

        if(cartItem.productId !== productId) {
            updatedCart.push(cartItem);
        }

    });

    cart = updatedCart;

}





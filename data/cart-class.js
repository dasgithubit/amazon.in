import { validDeliveryOption } from "./deliveryOptions.js";


// Oop: It represent the real world object
// It make it easy to create multiple object
// Inside object we would store data and the function
// Cart data inside the cart array

// I'm creating multiple object for each cart and business
// Instead of I will create a function and then stored inside the variable


class Cart{

    cartItem;
    #localStorageKey;

    constructor(local) {
        this.#localStorageKey = local;
        this.#loadFromStorage();
        
    }

    #loadFromStorage() {
    
        this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{

            productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity : 2,
            deliveryOptionId : '1'
        },
        {
            productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity : 1,
            deliveryOptionId : '2'
        }];

    }

    // localStorage is used to store the data permanently
    saveData() {
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem));
    }

    // Add or update item in the cart
    
    addToCart(productId, quantity) {
    
        let matchingItem;

        this.cartItem.forEach((cartItem) => {
            
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });


        if(matchingItem) {
            matchingItem.quantity += quantity;
        }

        else {
            this.cartItem.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }

        this.saveData();
        
    }

    // Remove item from the cart
    
    removeFromCart(productId) {
    
        const updatedCart = [];

        this.cartItem.forEach((cartItem) => {

            if(cartItem.productId !== productId) {
                updatedCart.push(cartItem);
            }

        });

        this.cartItem = updatedCart;
        this.saveData();
    }


    updateQuantity(productId, newQuantity) {
    
        let matchingItem;
    
        this.cartItem.forEach((cartItem) => {
    
            if(cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
    
        if(matchingItem) {
            matchingItem.quantity = newQuantity;
        }
        this.saveData(); 
    }

    calculateCartQuantity() {
    
        let cartQuantity = 0;
    
        this.cartItem.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
    
        return cartQuantity;
    }

    updateDeliveryOption(productId, deliveryId) {
    
        if(!productId) {
            return;
        }
    
        if(!validDeliveryOption(deliveryId)) {
            return;
        }
    
        let matchingItem;
        
        this.cartItem.forEach((cartItem) => {
            
            if(productId === cartItem.productId) {
                matchingItem = cartItem;   
            }
        });
    
        if(matchingItem) {
    
            matchingItem.deliveryOptionId = deliveryId;
            this.saveData();
    
        }
    }

}


const cart = new Cart('cart-oop');
// cart.localStorageKey = 'cart-oop';
// properties and method of the class are public so it can access outside the class
// In that case we can declare a property and method with (#) this symbol
cart.localStorageKey = 'hh';
console.log(cart);

const business = new Cart('cart-business');
console.log(business);

// To improve this we can create constructor 
// The constructor is used for the setUp code
// it call autmatically when we create a instante of the class
// what is instant of the class it an the object create by the class







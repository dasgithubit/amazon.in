import { validDeliveryOption } from "./deliveryOptions.js";


// Oop: It represent the real world object
// It make it easy to create multiple object
// Inside object we would store data and the function
// Cart data inside the cart array

// I'm creating multiple object for each cart and business
// Instead of I will create a function and then stored inside the variable

function Cart() {

    const cart = {

        cartItem : undefined,
    
        loadFromStorage(localStorageItem) {
    
            this.cartItem = JSON.parse(localStorage.getItem(localStorageItem)) || [{
    
                productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity : 2,
                deliveryOptionId : '1'
            },
            {
                productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity : 1,
                deliveryOptionId : '2'
            }];
    
        },
    
        // localStorage is used to store the data permanently
        saveData() {
            localStorage.setItem(localStorageItem,JSON.stringify(this.cartItem));
        },
    
    
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
            
        },
    
    
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
        },
    
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
        },
    
        calculateCartQuantity() {
    
            let cartQuantity = 0;
        
            this.cartItem.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
        
            return cartQuantity;
        },
    
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

    return cart;

}



const cart = Cart();
cart.loadFromStorage('cart-oop');
const business = Cart();
business.loadFromStorage('cart-business');
console.log(cart);
console.log(business);


























import { addToCart,cart,loadFromStorage,removeFromCart,updateDeliveryOption } from "../../data/cart.js";
import { getDelivery } from "../../data/deliveryOptions.js"; 

describe('Test suite: Add to cart', () => {

    beforeEach(() => {
        // we have to create a fake localStorage because in the actual file it already save data
        spyOn(localStorage,'setItem');
    });

    it('Existing cart item', () => {

        spyOn(localStorage,'getItem').and.callFake(() => {

            return JSON.stringify([
            {

                productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity : 2,
                deliveryOptionId : '1'
            },
            {
                productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity : 1,
                deliveryOptionId : '2'
            }
        ]);
    });

        loadFromStorage();
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',1);
        expect(cart.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[1].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity : 2,
                deliveryOptionId : '1'
            },
            {
                productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity : 2,
                deliveryOptionId : '2'
            }
    ]));
        

    });

    it('new cart item', () => {

        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        // I have to again call the cart so that it get refresh change to empty array
        loadFromStorage();


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity : 1,
            deliveryOptionId : '1'
        }]));
        
        
    });
});


describe('Test suite: remove from cart', () => {

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeEach(() => {

        spyOn(localStorage,'setItem');
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

    });


    it('remove a productId that is in the cart', () => {
        removeFromCart(productId1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId : productId2,
                quantity : 1,
                deliveryOptionId : '2'
            }
        ]));

    });

    it('remove a productId that not in the cart', () => {
        removeFromCart('does not exit');
        expect(cart.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
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

        ]));
    });

    
});

describe('test suite: update the delivery option', () => {


    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeEach(() => {

        spyOn(localStorage,'setItem');
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

    });
    
    it('update delivery option', () => {

        updateDeliveryOption(productId1, '3');
        expect(cart.length).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId : productId1,
                quantity : 2,
                deliveryOptionId : '3'
            },
            {
                productId : productId2,
                quantity : 1,
                deliveryOptionId : '2'
            }
        ]));

    });

    it('edge test case update productId which is not present ',() => {

        updateDeliveryOption('does not exist', '3');
        expect(cart.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(cart[1].deliveryOptionId).toEqual('2');
        expect(cart[0].deliveryOptionId).toEqual('1');
        updateDeliveryOption(productId2,'4');
        expect(cart[1].productId).toEqual(productId2);
        expect(cart[1].deliveryOptionId).toEqual('2');
        
    });

    it('edge test case update quantity Id which is not present', () => {

        updateDeliveryOption(productId1, 'does not exits');
        updateDeliveryOption(productId2, '4');
        expect(cart.length).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(cart[1].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    });
});




import { addToCart,cart,loadFromStorage } from "../../data/cart.js";

describe('Test suite: Add to cart', () => {
    it('Existing cart item', () => {

        spyOn(localStorage,'setItem');

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

    });

    it('new cart item', () => {

        // we have to create a fake localStorage because in the actual file it already save data
        spyOn(localStorage, 'setItem');

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
        
        
    });
})
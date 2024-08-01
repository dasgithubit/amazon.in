import { Product, Clothing, Appliance} from "../../data/products.js"



describe('Test Suite: Product', () => {

    const product = new Product(
        {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: [
              "socks",
              "sports",
              "apparel"
            ]
          }
    )
    it('check the properties are correct or not ', () => {
        expect(product instanceof Product).toEqual(true);
        expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(product.rating.stars).toEqual(4.5);
     
    });

    it('check the method are correctly working or not', () => {
        expect(product.getPrice()).toEqual('$10.90');
        expect(product.getInstructionLink()).toEqual('');
        expect(product.getRating()).toEqual('images/ratings/rating-45.png');
        
    });
});
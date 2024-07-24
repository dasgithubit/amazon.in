import {cart} from "../data/cart.js";
import {products} from "../data/products.js";


// our code doesn't look organized so we would be using funcion to store the data

function addCartQunatity(quantity) {

      let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity;

        });

        document.querySelector('.js-cartQuantity').innerHTML = cartQuantity;

}

// storing the timeout in object because each product has it own timeout

function displayAddedMsg(productId) {

      const addMessagetimeOut = {};

      // Check if there's a previous timeout for this
      // product. If there is, we should stop it.
      const previousTimeoutId = addMessagetimeOut[productId];

      if(previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }

      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

      // adding a new class name for styling

      addedMessage.classList.add('added-to-cart-visible');

      const timeOutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      },2000);

      // storing in the addMessagetimeOut object along with the poductId
      addMessagetimeOut[productId] = timeOutId;

}


// Generate Html page 
let html = '';

products.forEach((product) => {
    // console.log(product);

    html += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-cart-button" data-add-cart="${product.id}">
            Add to Cart
          </button>
        </div>`

});

// we have html attribute that is  data-attribute 
// when I click on the add to card it will provide me the data(productId) of that list

document.querySelector('.js-products-grid').innerHTML = html;

// Select add to cart using the forEach loop

document.querySelectorAll('.js-cart-button')
.forEach((button) => {
    button.addEventListener('click', () => {

        //  product has a same name but id will unquie so increment the product using the ID
        const productId = button.dataset.addCart;

        // selector quantity is get by using the dom
        // dom gives us the value in the string so convert it into number

        const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      // function 
        addToCart(productId, quantity);

        addCartQunatity(quantity);

        displayAddedMsg(productId);

    });

});






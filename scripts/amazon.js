import {cart, addToCart, calculateCartQuantity} from "../data/cart.js";
import {products, loadProductsFetch} from "../data/products.js";
import {currencyFormat} from "./utils/money.js"


// This method is also called as callback function

loadProductsFetch().then(()=> {
  renderAmazonHTML();
  
});
/*
loadProduct(renderAmazonHTML);
*/
// our code doesn't look organized so we would be using funcion to store the data



function renderAmazonHTML() {

    const addMessagetimeOut = {}; 

    function updateCartQuantity() {

        const cartQuantity = calculateCartQuantity();
        document.querySelector('.js-cartQuantity').innerHTML = cartQuantity;
    }

    // when the page load it should display the cart Quantity
    updateCartQuantity();


    // storing the timeout in object because each product has it own timeout

    function displayAddedMsg(productId) {

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

    // products.forEach((product) => {
        // console.log(product);
        const url = new URL(window.location.href);
        const search = url.searchParams.get('search');

        let filteredProduct = products;

        if(search){
          filteredProduct = products.filter((product) => {
              let matchingkeywords = false;

              product.keywords.forEach((keyword) => {
                if(keyword.toLowerCase().includes(search.toLowerCase())) {
                  matchingkeywords = true;
                }
              });

              return matchingkeywords || 

              product.name.toLowerCase().includes(search.toLowerCase());

          });
        }

        filteredProduct.forEach((product) => {

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
                  src='${product.getRating()}'>
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>

              <div class="product-price">
                ${product.getPrice()}
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

              ${product.getSizeChart()}

              <div class="product-spacer"></div>

              <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary js-cart-button" data-add-cart="${product.id}">
                Add to Cart
              </button>
            </div>
            `;

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

            // quantity will be update on the header of the amazon
            updateCartQuantity();

            // display added msg on the page using the classList and set the opacity to 1
            displayAddedMsg(productId);

        });
    });


    document.querySelector('.js-search-button')
    .addEventListener('click', () => {
        const search = document.querySelector('.js-search-bar').value;

        window.location.href = `amazon.html?search=${search}`;
    });


    document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {

      if(event.key === 'Enter') {
        const search = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${search}`;

      }
        
    })



}









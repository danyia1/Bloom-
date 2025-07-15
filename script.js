document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();

 
  const buttons = document.querySelectorAll(".buy-btn");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const productName = button.getAttribute("data-product-name");
      const productPrice = button.getAttribute("data-product-price");
      const productImage = button.getAttribute("data-product-image");
      
if (!productName || isNaN(productPrice) || !productImage) {
        alert(" There is an error in the product data. Please review the code.");
        return;
      }

      addToCart(productName, productPrice, productImage);
    });
  });

if (window.location.pathname.endsWith('cart.html')) {
    displayCartItems();

   }
});



function addToCart(productName, productPrice, productImage) {
  

  let cart = getCart();
  

  let productExists = cart.find(item => item.name === productName);
  
  if (productExists) {

    productExists.quantity++;
  } else {

    cart.push({
      name: productName,
      price: parseFloat(productPrice),
      quantity: 1,
      image: productImage
    });
  }


  localStorage.setItem('cart', JSON.stringify(cart));


  updateCartCount();
  alert('The product has been added to the cart.    ');
}





function getCart() {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!Array.isArray(cart)) {
      cart = [];
    }
    return cart;
  } catch (error) {
    console.error("Error parsing cart data:", error);
    localStorage.removeItem('cart'); 
    return [];
  }
}










function updateCartCount() {
  let cartCountElement = document.getElementById('cart-count');
 if (!cartCountElement) {
  console.warn("عنصر 'cart-count' غير موجود في DOM.");
  return;
}


  let cart = getCart();
  let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = cartCount;
}


function displayCartItems() {
  let cart = getCart();
  let cartItemsContainer = document.getElementById('cart-items');
  let totalPriceElement = document.getElementById('price-value');

  if (!cartItemsContainer || !totalPriceElement) return;

  cartItemsContainer.innerHTML = ""; 


  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += item.price * item.quantity;

    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');


   cartItem.innerHTML = `
  <img src="${item.image}" alt="${item.name}" class="cart-item-image">
  <div class="cart-item-details">
    <p class="cart-item-name">${item.name}</p>


<p class="cart-item-price">SR ${!isNaN(item.price) && item.price > 0 ? item.price.toFixed(2) : 'Invalid price'}</p>




    <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
    <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
  </div>
`;



    cartItemsContainer.appendChild(cartItem);
  });



totalPriceElement.textContent = `SR ${Number.isFinite(totalPrice) ? totalPrice.toFixed(2) : 'Invalid total price'}`;




}

function removeFromCart(productName) {
  let cart = getCart();
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems(); 
  updateCartCount();
}


function redirectToCartPage() {
  window.location.href = 'cart.html';
}


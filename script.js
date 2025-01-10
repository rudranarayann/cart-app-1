const API_URL = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";

const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');

async function fetchCartItems() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    let subtotal = 0;
    cartItemsContainer.innerHTML = ''; 

    data.items.forEach((item, index) => {
      const itemSubtotal = (item.price / 100) * item.quantity;
      subtotal += itemSubtotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <img src="${item.image}" alt="${item.title}" style="width: 80px;">
          ${item.title}
        </td>
        <td>₹${(item.price / 100).toFixed(2)}</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
        </td>
        <td>₹${itemSubtotal.toFixed(2)}</td>
        <td>
          <img src="icons8-delete-48.png" class="delete-icon" data-index="${index}">
        </td>
      `;
      cartItemsContainer.appendChild(row);
    });

    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    totalElement.textContent = `₹${subtotal.toFixed(2)}`;

   
    localStorage.setItem('cartData', JSON.stringify(data.items));

    
    addEventListeners(data.items);

  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}


function addEventListeners(cartItems) {

  const quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const index = e.target.dataset.index;
      const newQuantity = e.target.value;
      cartItems[index].quantity = newQuantity;
      updateCart(cartItems);
    });
  });

  const deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      cartItems.splice(index, 1); 
      updateCart(cartItems);
    });
  });
}


function updateCart(cartItems) {
  let subtotal = 0;
  cartItemsContainer.innerHTML = ''; 

  cartItems.forEach((item, index) => {
    const itemSubtotal = (item.price / 100) * item.quantity;
    subtotal += itemSubtotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      
      <t<td>
        <img src="${item.image}" alt="${item.title}" style="width: 100px; height:100px">
        ${item.title}
      </td>d>₹${(item.price / 100).toFixed(2)}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
      </td>
      <td>₹${itemSubtotal.toFixed(2)}</td>
      <td>
        <img src="icons8-delete-48.png" class="delete-icon" data-index="${index}">
      </td>
    `;
    cartItemsContainer.appendChild(row);
  });

  subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
  totalElement.textContent = `₹${subtotal.toFixed(2)}`;

  localStorage.setItem('cartData', JSON.stringify(cartItems));
}


checkoutBtn.addEventListener('click', () => {
  alert('Proceeding to checkout...');

});

fetchCartItems();

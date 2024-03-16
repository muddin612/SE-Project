import { supabase } from "/Javascript/database.js";

var productId = null;

function GetProducts() {
  return supabase
    .from("product_table")
    .select("*")
    .then(({ data, error }) => {
      if (error) {
        console.log("Error fetching product products:", error.message);
        throw error;
      }
      return data;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  function DisplayProduct(products) {
    const productsContainer = document.getElementById("products");
    let row;
    products.forEach((product, index) => {
      if (index % 4 === 0) {
        row = document.createElement("div");
        row.className = "row px-4";
        productsContainer.appendChild(row);
      }
      const col = document.createElement("div");
      col.className = "col mb-5";
      col.innerHTML = `
            <div class="card h-100" data-product-id="${product.product_id}">
                <!-- Product image-->
                <img class="card-img-top" src="${product.product_url}" alt="Product Image" />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${product.product_name}</h5>
                        <!-- Product price--> &#36
                        ${product.product_price}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto btn-cart" href="#" data-product-id="${product.product_id}">Add to cart</a></div>
                </div>
            </div>
        `;
      row.appendChild(col);
    });
    attachProductCardListeners();
  }

  GetProducts()
    .then((products) => {
      DisplayProduct(products);
    })
    .catch((error) => {
      console.log("Error displaying products:", error.message);
    });
});

function handleProductClick(event) {
  event.preventDefault();
  productId = event.currentTarget.getAttribute('data-product-id');
  localStorage.setItem('product_id', productId);
  console.log('Product ID:', productId);
  window.location.href = '/HTML/product_files/product_view.html';
}

function handleAddToCartClick(event) {
  event.preventDefault();
  event.stopPropagation();
  productId = event.currentTarget.getAttribute('data-product-id');
  localStorage.setItem('product_id', productId);
  console.log('Product ID:', productId);
  window.location.href = '/HTML/product_files/cart.html';
}

function attachProductCardListeners() {
  const product_cards = document.querySelectorAll('.card');
  product_cards.forEach(productCard => {
    productCard.addEventListener('click', handleProductClick);
    const addToCart = productCard.querySelector('.btn-cart');
    addToCart.addEventListener('click', handleAddToCartClick);
  });
}

export function getProductId(){
  let product_id = localStorage.getItem('product_id')
  return product_id;
}
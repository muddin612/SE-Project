import { supabase } from "/Javascript/database.js";

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
  function DisplayProduct(product) {
    const productsContainer = document.getElementById("products");
    let row;
    product.forEach((product, index) => {
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
                <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Product Image" />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${product.product_name}</h5>
                        <!-- Product price-->
                        ${product.product_price}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto btn-cart" href="#">Add to cart</a></div>
                </div>
            </div>
        `;
      row.appendChild(col);
    });
    GetProductID();
    CartBtn();
  }

  GetProducts()
    .then((products) => {
      DisplayProduct(products);
    })
    .catch((error) => {
      console.log("Error displaying products:", error.message);
    });
});

export function GetProductID() {
  const product_card = document.querySelectorAll('.card');
  let productId;
  product_card.forEach(productCard => {
    productCard.addEventListener('click',function(event){
      event.preventDefault();
      productId = productCard.getAttribute('data-product-id');
      console.log('Product ID:', productId);
    });

    const addToCart = productCard.querySelector('.btn-cart');
    addToCart.addEventListener('click',function(event){
      event.preventDefault();
      event.stopPropagation();
      const productId = productCard.getAttribute('data-product-id');
      console.log('Add to cart clicked for Product ID:', productId);

    });

  });
  return productId;
}

function CartBtn(){
  const cart_btn = document.querySelector('.btn-cart');
  cart_btn.addEventListener('click',function(event){
    event.preventDefault();
    window.location.href = '/HTML/product files/cart.html';
  });
}



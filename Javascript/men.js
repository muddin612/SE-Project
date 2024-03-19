import { supabase } from "/Javascript/database.js";
import {getSelected} from "/Javascript/navbar_men_women_helper.js"

document.addEventListener("DOMContentLoaded", function () {
  const selectedOpt = getSelected();
  const selectedOptCloth = `${selectedOpt}'s Clothing`;
  const changeSel = document.getElementById("catSelector")
  changeSel.textContent = selectedOpt;

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
                        <p><small>${product.product_category}</small></p>
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
  }
  GetProducts(selectedOptCloth)
  .then((products) => {
    DisplayProduct(products);
  })
  .catch((error) => {
    console.log("Error displaying products:", error.message);
  });


});


function GetProducts(category) {
    return supabase
      .from("product_table")
      .select("*")
      .eq('product_category', category)
      .then(({ data, error }) => {
        if (error) {
          console.log("Error fetching product products:", error.message);
          throw error;
        }
        return data;
      });
  }
import { supabase } from "/Javascript/database.js";
import { getProductId } from "./view_products.js";


document.addEventListener('DOMContentLoaded', function () {

  function DisplayProduct(data) {
    const container = document.querySelector('.container.px-4.px-lg-5.my-5');
    container.innerHTML = `
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6">
                <img
                    class="card-img-top mb-5 mb-md-0"
                    src="${data.product_url}"
                    alt="${data.product_name}"
                />
            </div>
            <div class="col-md-6">
                <h1 class="display-5 fw-bolder">${data.product_name}</h1>
                <div class="fs-5 mb-5">
                    <span> &#36 ${data.product_price}</span>
                </div>
                <p class="lead">${data.product_description}</p>
                <div class="d-flex">
                    <input
                        class="form-control text-center me-3"
                        id="inputQuantity"
                        type="number"
                        value="1"
                        step="1"
                        min="1"
                        max="10"
                        style="max-width: 4rem"
                    />
                    <button class="btn btn-outline-dark flex-shrink-0" type="button">
                        <i class="bi-cart-fill me-1"></i>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

  GetProducts().then(data => {
    DisplayProduct(data);
  })
});

function productID(){
  const productId = getProductId();
  return productId;
}

function GetProducts() {
  let productid = productID();
  return supabase
    .from("product_table")
    .select("*")
    .eq('product_id', productid)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error fetching product products:", error.message);
        throw error;
      }
      return data[0];
    });
}
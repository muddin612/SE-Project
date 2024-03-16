import { supabase } from "/Javascript/database.js";
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

  
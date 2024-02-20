import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const supabaseUrl = "https://ovufxfqxnbhzzxjeopxw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92dWZ4ZnF4bmJoenp4amVvcHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0MDkwMzYsImV4cCI6MjAyMjk4NTAzNn0.Qnl8Bp8sTSrlOBv2ezwCRzSRKPl_sw1rHi-CG8-Mxyg";
export const supabase = createClient(supabaseUrl, supabaseKey);

/*
const fetchUserData = async () => {
  try {
    let { data, error } = await supabase.from("Test_Table").select("*");

    if (error) {
      throw error;
    }

    console.log("User data:", data);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};
*/

function GetProducts() {
  const fetchProductData = async () => {
    try {
      let { data, error } = await supabase.from("product_table").select("*");
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error fetching product data:", error.message);
    }
  };
  fetchProductData();
}

function DisplayProducts(){
  
}
DisplayProducts()



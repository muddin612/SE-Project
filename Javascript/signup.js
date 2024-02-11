import { supabase } from "/Javascript/database.js";

function getHTMLFields() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const emailAddress = document.getElementById("emailAddress").value;
  const userType = document.getElementById("userType").value;
  const businessName = document.getElementById("businessName").value;

  const addDataSeller = async () => {
    try {
      const { data, error } = await supabase
        .from("Seller_Info")
        .insert([
          {
            seller_firstname: firstName,
            username: username,
            password: password,
            seller_lastname: lastName,
            Business_name: businessName,
            email_address: emailAddress,
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const addDataBuyer = async () => {
    try {
      const { data, error } = await supabase
        .from("User_Table")
        .insert([
          {
            user_firstname: firstName,
            username: username,
            password: password,
            user_lastname: lastName,
            email_address: emailAddress,
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  if (userType == "Buyer") {
    addDataBuyer();
  } else {
    addDataSeller();
  }
}

function clearBusinessName() {
  document.getElementById("businessName").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("userType").addEventListener("change", function () {
    var selectedValue = this.value;
    var businessNameRow = document.getElementById("businessNameRow");

    if (selectedValue === "Seller") {
      businessNameRow.style.display = "block";
    } else {
      businessNameRow.style.display = "none";
      clearBusinessName();
    }
  });

  const signupButton = document.querySelector('button[type="submit"]');
  signupButton.addEventListener("click", function (event) {
    event.preventDefault();
    getHTMLFields();
  });
});

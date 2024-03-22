import { supabase } from "/Javascript/database.js";

function getAdminInfo() {
     supabase
      .from("Admin_table")
      .select("admin_firstname, admin_lastname, email_address")
      .then(({ data, error }) => {
        if (error) {
          console.log("Error fetching product products:", error.message);
          throw error;
        }
        displayAdminTable(data);
        return data;
      });

}

function displayAdminTable(adminData) {
    const adminTableContainer = document.getElementById('adminTableContainer');
  
    // Clear existing content
    adminTableContainer.innerHTML = '';
  
    // Create a table element
    const table = document.createElement('table');
  
    // Create table header
    const headerRow = table.createTHead().insertRow(0);
    Object.keys(adminData[0]).forEach(key => {
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });
  
    // Create table rows with data
    adminData.forEach(rowData => {
      const row = table.insertRow();
      Object.values(rowData).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
      });
    });
  
    // Append the table to the container
    adminTableContainer.appendChild(table);
  }
  
  // Call the getAdminInfo function
  getAdminInfo();
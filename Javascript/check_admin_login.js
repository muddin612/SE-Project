import { supabase } from "/Javascript/database.js";


    const email = document.getElementById("inputEmail").value;
    const pw = document.getElementById("inputPassword").value;

    console.log(email)
    console.log(pw)

    const { data, error } = await supabase
            .from("Admin_table")
            .select(email_address, password);
            console.log( data)
    
          if (email_address == email && password == pw){
            console.log("Success 101")
            //window.location.href = 'HTML\admin\main_admin_page.html'
          }  

      


import {supabase} from "/Javascript/database.js"
document.addEventListener("DOMContentLoaded", function(){
    const loginButton = document.getElementById('login-btn');
    loginButton.addEventListener("click",function(event){
        event.preventDefault();
        getLoginInfo();

    });

});

function getLoginInfo(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('typePasswordX-2').value;

   const status =  checkLogin(username, password);
   console.log(status);
}

function checkLogin(username, password){

    return supabase
    .from("User_Table")
    .select()
    .eq('username', username)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error fetching product products:", error.message);
        throw error;
      }
      return data[0];
    });

}
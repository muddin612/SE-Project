document.addEventListener("DOMContentLoaded", function() {
  navBarSelector();
});

function navBarSelector() {
  const dropdownMenu = document.getElementById("shopDropdown");
  const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      const selectedValue = this.textContent.trim();
      if(selectedValue != "All Products"){
        localStorage.setItem("selected",selectedValue);
      }
    });
  });
}

export function getSelected(){
    const selectedMenWomen = localStorage.getItem("selected");
    return selectedMenWomen;
}
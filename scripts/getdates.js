// Purpose: Get the current year and update the footer with it
const domYearElement= document.querySelector("#currentyear");
// create date object
const today = new Date();
const currentYear = today.getFullYear();
domYearElement.textContent = currentYear;


// Get the last modified date and update footer with it
const domLastModifiedElement= document.querySelector("#lastModified");
domLastModifiedElement.textContent  = `Last Modified: ${today.toLocaleDateString()}`;


const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});



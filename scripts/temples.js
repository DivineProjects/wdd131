const hamButton = document.querySelector('#menu');
// console.log(hamButton);
const navigation = document.querySelector('.nav-menu');
// console.log(navigation);

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// Select all navigation links
document.addEventListener("DOMContentLoaded", () => {
    // Select all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
           
            // Remove 'active' class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });

    // Purpose: Get the current year and update the footer
    const domYearElement = document.querySelector("#currentyear");
    if (domYearElement) {
        domYearElement.textContent = new Date().getFullYear();
    }

    // Get the last modified date and update footer
    const domLastModifiedElement = document.querySelector("#lastModified");
    if (domLastModifiedElement) {
        domLastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
});


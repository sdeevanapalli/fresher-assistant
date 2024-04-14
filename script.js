document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll("nav a");

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Toggle effect for sections
    sections.forEach(section => {
        section.addEventListener("click", function() {
            this.classList.toggle("active");
        });
    });

    // Add scroll event listener
    window.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY;

        // Highlight navigation link based on scroll position
        navLinks.forEach(link => {
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            const sectionTop = targetSection.offsetTop;
            const sectionHeight = targetSection.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });
});

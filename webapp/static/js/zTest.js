let toggles = document.querySelectorAll(".toggle");

toggles.forEach(function(toggle) {
    toggle.addEventListener("click", function(e) {
        e.preventDefault();

        let content = this.previousElementSibling;
        let moreContent = content.querySelector(".more");

        if (moreContent.style.display === "none" || moreContent.style.display === "") {
            moreContent.style.display = "block";
            this.textContent = "Weniger anzeigen";
            content.style.maxHeight = "none";
            content.classList.remove('faded'); // Entfernen Sie den Fade-Effekt
        } else {
            moreContent.style.display = "none";
            this.textContent = "Weiterlesen";
            content.style.maxHeight = "350px";
            content.classList.add('faded'); // Fügen Sie den Fade-Effekt wieder hinzu
        }
    });
});

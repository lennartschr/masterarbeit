var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});

let toggles = document.querySelectorAll(".toggle");

toggles.forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
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


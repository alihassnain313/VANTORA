/* =========================================================
   VANTORA — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PAGE LOADER
    ========================== */

    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("hide");
            }

            document.body.classList.add("loaded");

        }, 500);

    });


    /* =========================
       HEADER SCROLL EFFECT
    ========================== */

    const header = document.getElementById("header");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =========================
       MOBILE MENU
    ========================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            menuToggle.classList.toggle("active");

        });


        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");
                menuToggle.classList.remove("active");

            });

        });

    }


    /* =========================
       ANIMATED COUNTERS
    ========================== */

    const counters = document.querySelectorAll("[data-count]");

    const animateCounter = (counter) => {

        const target = Number(counter.getAttribute("data-count"));

        if (Number.isNaN(target)) return;

        let current = 0;

        const duration = 1400;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * easedProgress);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }

        };

        requestAnimationFrame(updateCounter);

    };


    /* =========================
       COUNTER OBSERVER
    ========================== */

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(counter => {
            counter.textContent =
                counter.getAttribute("data-count");
        });

    }


    /* =========================
       REVEAL ANIMATIONS
    ========================== */

    const revealElements = document.querySelectorAll(
        ".service-card, .stat-item, .intro-grid, .cta-box"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =========================
       SMOOTH ANCHOR SCROLL
    ========================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================
       MOUSE PARALLAX — HERO
    ========================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    const mainCard =
        document.querySelector(".main-card");

    if (
        heroVisual &&
        mainCard &&
        window.innerWidth > 900
    ) {

        heroVisual.addEventListener("mousemove", event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 5;

            const rotateX =
                ((centerY - y) / centerY) * 4;

            mainCard.style.transform =
                `perspective(1000px)
                 rotateY(${-7 + rotateY}deg)
                 rotateX(${3 + rotateX}deg)
                 translateY(-3px)`;

        });


        heroVisual.addEventListener("mouseleave", () => {

            mainCard.style.transform =
                `perspective(1000px)
                 rotateY(-7deg)
                 rotateX(3deg)
                 translateY(0)`;

        });

    }


    /* =========================
       ACTIVE NAV LINK
    ========================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach(link => {

        const href =
            link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });


    /* =========================
       ESCAPE KEY
       CLOSE MOBILE MENU
    ========================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navMenu) {
                navMenu.classList.remove("open");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

        }

    });

});
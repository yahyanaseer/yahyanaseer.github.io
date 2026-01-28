(function () {
    // Year
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());

    // Mobile nav
    const menuBtn = document.getElementById("menuBtn");
    const menuCloseBtn = document.getElementById("menuCloseBtn");
    const mobileNav = document.getElementById("mobileNav");

    function openMenu() {
        if (!mobileNav) return;
        mobileNav.hidden = false;
        document.body.style.overflow = "hidden";
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        if (!mobileNav) return;
        mobileNav.hidden = true;
        document.body.style.overflow = "";
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    }

    if (menuBtn) menuBtn.addEventListener("click", openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener("click", closeMenu);

    if (mobileNav) {
        mobileNav.addEventListener("click", (e) => {
            // click on backdrop closes
            if (e.target === mobileNav) closeMenu();
        });

        // close when clicking any link marked data-close
        mobileNav.querySelectorAll("[data-close]").forEach((el) => {
            el.addEventListener("click", closeMenu);
        });
    }

    // Fake quote form submission
    const quoteForm = document.getElementById("quoteForm");
    const toast = document.getElementById("toast");
    if (quoteForm) {
        quoteForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (toast) {
                toast.hidden = false;
                clearTimeout(toast._t);
                toast._t = setTimeout(() => (toast.hidden = true), 4500);
            }
            quoteForm.reset();
        });
    }

    // Reviews slider (simple)
    const track = document.getElementById("reviewsTrack");
    const prev = document.getElementById("prevReview");
    const next = document.getElementById("nextReview");
    if (track) {
        let idx = 0;

        function cardsPerView() {
            return window.matchMedia("(max-width: 860px)").matches ? 1 : 3;
        }

        function maxIdx() {
            const total = track.children.length;
            return Math.max(0, total - cardsPerView());
        }

        function update() {
            const gap = 14; // must match CSS gap
            const card = track.children[0];
            if (!card) return;

            const cardW = card.getBoundingClientRect().width;
            const step = cardW + gap;
            idx = Math.min(Math.max(idx, 0), maxIdx());
            track.style.transform = `translateX(${-idx * step}px)`;
        }

        if (prev) prev.addEventListener("click", () => { idx -= 1; update(); });
        if (next) next.addEventListener("click", () => { idx += 1; update(); });

        window.addEventListener("resize", update);
        update();
    }

    // Segment toggle (visual only)
    document.querySelectorAll(".seg").forEach((seg) => {
        const btns = seg.querySelectorAll(".seg__btn");
        btns.forEach((b) => {
            b.addEventListener("click", () => {
                btns.forEach((x) => x.classList.remove("is-active"));
                b.classList.add("is-active");
            });
        });
    });
})();


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quoteForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop page reload

        // ---- Get active service type (Residential / Commercial)
        const activeTypeBtn = document.querySelector(".seg__btn.is-active");
        const type = activeTypeBtn ? activeTypeBtn.textContent.trim() : null;

        // ---- Get form values
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const phone = form.querySelector('[name="phone"]').value.trim();
        const zip = form.querySelector('[name="zip"]').value.trim();

        const smsOptIn = form.querySelectorAll('input[type="checkbox"]')[0].checked;
        const emailOptIn = form.querySelectorAll('input[type="checkbox"]')[1].checked;

        // ---- Now you have usable variables
        console.log({
            type,
            name,
            email,
            phone,
            zip,
            smsOptIn,
            emailOptIn
        });

        // Call your custom function
        handleQuoteSubmission({
            type,
            name,
            email,
            phone,
            zip,
            smsOptIn,
            emailOptIn
        });
    });
});

function handleQuoteSubmission(data) {
    // Do whatever you want here (API call, save, analytics, etc.)
    console.log("Submitting quote:", data);
}
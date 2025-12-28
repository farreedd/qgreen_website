function setYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
}

function wireFormConfirmation(formId, statusId) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);

    if (!form || !status) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Must exist in your HTML <form action="...">
        const endpoint = form.getAttribute("action");
        if (!endpoint) {
            console.error("Form action is missing (Formspree endpoint).");
            alert("Form is not configured yet.");
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : null;

        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            const formData = new FormData(form);

            const res = await fetch(endpoint, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (!res.ok) {
                let details = "";
                try {
                    const data = await res.json();
                    details = data?.error || JSON.stringify(data);
                } catch (_) { }
                throw new Error(`Formspree error: ${res.status} ${res.statusText} ${details}`);
            }

            // Success UI
            status.classList.remove("hidden");
            form.reset();
            setTimeout(() => status.classList.add("hidden"), 8000);
        } catch (err) {
            console.error(err);
            alert("Could not send your message. Please try again.");
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                if (originalBtnText) submitBtn.textContent = originalBtnText;
            }
        }
    });
}



function setActiveNav() {
    const page = document.body.getAttribute("data-page");
    if (!page) return;

    const desktopIds = {
        solutions: "nav-solutions",
        "use-cases": "nav-use-cases",
        technology: "nav-technology",
        about: "nav-about",
        contact: "nav-contact",
    };

    const mobileIds = {
        solutions: "mnav-solutions",
        "use-cases": "mnav-use-cases",
        technology: "mnav-technology",
        about: "mnav-about",
        contact: "mnav-contact",
    };

    const allDesktop = Object.values(desktopIds);
    const allMobile = Object.values(mobileIds);

    [...allDesktop, ...allMobile].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove("text-qgreen-blue", "font-semibold");
        el.classList.add("text-qgreen-textSecondary", "font-medium");
    });

    const d = desktopIds[page];
    const m = mobileIds[page];

    const dEl = d ? document.getElementById(d) : null;
    const mEl = m ? document.getElementById(m) : null;

    [dEl, mEl].forEach((el) => {
        if (!el) return;
        el.classList.remove("text-qgreen-textSecondary", "font-medium");
        el.classList.add("text-qgreen-blue", "font-semibold");
    });
}

function setSecondaryCta() {
    const page = document.body.getAttribute("data-page");
    const cta = document.getElementById("secondaryCta");
    if (!cta) return;

    // Default: promote Use Cases
    let href = "./use-cases.html";
    let label = "View use cases";

    // Special case: on Use Cases page, promote Solutions instead
    if (page === "use-cases") {
        href = "./solutions.html";
        label = "View solutions";
    }

    cta.setAttribute("href", href);
    cta.textContent = label;
}

function wireMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    function closeMenu() {
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
        }
    }

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle("hidden");
        });

        mobileMenu.querySelectorAll("a").forEach((a) => {
            a.addEventListener("click", () => closeMenu());
        });

        document.addEventListener("click", () => closeMenu());
        mobileMenu.addEventListener("click", (e) => e.stopPropagation());
    }
}


async function loadPartial(id, url) {
    const el = document.getElementById(id);
    if (!el) return;

    // Cache-bust for Safari (and during development)
    const version = "v=1"; // bump to v=2, v=3 when you update partials
    const sep = url.includes("?") ? "&" : "?";
    const bustUrl = `${url}${sep}${version}`;

    const res = await fetch(bustUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${bustUrl}`);
    el.innerHTML = await res.text();
}


(async () => {
    await loadPartial("siteHeader", "./partials/header.html");
    await loadPartial("siteFooter", "./partials/footer.html");

    setYear();
    setActiveNav();
    setSecondaryCta();
    wireMobileMenu();

    //Wire forms AFTER DOM + partials are ready
    wireFormConfirmation("contactForm", "formStatus");         // contact.html
    wireFormConfirmation("contactFormHome", "formStatusHome"); // index.html

    // Smooth scroll for same-page anchors (if any)
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            const id = a.getAttribute("href");
            if (!id || id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
})();

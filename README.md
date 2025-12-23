# Q-Green Website

Q-Green is a lightweight, static website designed to present sustainability-focused solutions, use cases, and contact flows.  
The site is built with simplicity in mind to ensure fast load times, easy maintenance, and compatibility with modern static hosting platforms.

---

## Project Overview

- Static website (HTML, CSS, JavaScript)
- Responsive layout
- Modular partial loading (for reusable sections like header/footer)
- Optimized for deployment on CDN-based hosting (e.g., Cloudflare Pages)

Why this matters:

- Static sites are faster, cheaper to host, and more secure than server-heavy setups.
- CDN hosting ensures global performance with minimal configuration.

---

## Project Structure

<pre>
q-green-website/
├── index.html
├── solutions.html
├── use-cases.html
├── about.html
├── contact.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── partials/
│   ├── header.html
│   └── footer.html
├── README.md
└── .gitignore
</pre>

Explanation:

- `assets/` holds all styles, scripts, and images
- `partials/` contains reusable HTML sections loaded dynamically
- Each page is a standalone HTML file for simplicity

---

## Requirements to Run Locally

Minimum requirements:

- A modern web browser (Chrome, Firefox, Safari)
- Optional but recommended:
  - Node.js (for a local dev server)
  - Python (alternative local server)

Why a local server is recommended:

- Browser security rules block some JavaScript features (like `fetch`) when opening files directly.

---

## How to Run Locally (Recommended Methods)

From the project root:

```bash
python3 -m http.server 8000
```

Then open:
http://localhost:8000

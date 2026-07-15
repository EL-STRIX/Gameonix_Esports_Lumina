<div align="center">

# LuminaBooks
**Discover Your Next Great Read**

A comprehensive, client-side digital reading ecosystem providing high-quality literature, tech resources, and academic books directly to your screen.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](#)

</div>

---


## 📖 Project Overview

**LuminaBooks** is a dynamic, fully client-side digital library and bookstore platform built entirely without external frameworks. 

**Why it was built:** The project was engineered to demonstrate how modern, responsive, and complex data-driven architectures can be achieved purely using standard web technologies (HTML, CSS, JavaScript) and static JSON data, completely eliminating the overhead of heavy frameworks or external dependencies.

**Who it is for:** Book enthusiasts, students, and lifelong learners seeking a fast, distraction-free environment to discover, review, and download digital books.

**Main purpose:** To provide a seamless reading ecosystem that bridges the gap between authors and readers, while showcasing the power of vanilla client-side rendering and state management.

---

## ✨ Key Features

- **Dynamic Catalog Rendering:** Books are loaded and rendered dynamically from a static JSON database using vanilla JavaScript `XMLHttpRequest`.
- **Client-Side Filtering & Sorting:** Instantly filter the catalog by genre (Fiction, Sci-Fi, History, Psychology) without page reloads.
- **Premium Membership Flow:** A mock subscription system powered by `sessionStorage` that instantly unlocks exclusive titles and updates the UI globally.
- **Detailed Book Profiles:** Individual book pages populated dynamically via URL parameters, displaying summaries, ratings, advantages, disadvantages, and reviews.
- **Interactive Review System:** Users can leave local reviews that are appended to the page DOM.
- **Responsive Grid Layouts:** Pure CSS Flexbox and CSS Grid implementations ensuring a beautiful experience across all device sizes.
- **Framework-Free Architecture:** Zero reliance on Bootstrap, Tailwind, jQuery, or external font libraries (utilizes native system fonts and native emojis).

---

## 📸 Screenshots

* **Home Page**: The main landing experience.  
  ![Home Page](assets/images/screenshots/home.png)
* **Catalog Grid**: The dynamic book browsing interface.  
  ![Catalog Grid](assets/images/screenshots/book-list.png)
* **Book Details**: Individual book profiles.  
  ![Book Details](assets/images/screenshots/book-details.png)
* **Premium Page**: The premium feature showcase.  
  ![Premium Page](assets/images/screenshots/premium.png)
* **About Page**: The Lumina story and mission.  
  ![About Page](assets/images/screenshots/about.png)
* **FAQ Page**: Frequently asked questions.  
  ![FAQ Page](assets/images/screenshots/faq.png)

---

## 🛠️ Technology Stack

**Frontend**
* **HTML5:** Semantic, accessible structuring.
* **CSS3:** Custom modular styling, CSS Variables, Flexbox, and Grid (No CSS Frameworks used).
* **JavaScript:** Vanilla JS for all logic, DOM manipulation, and routing (No jQuery used).
* **JSON:** Local data structures replacing a traditional backend database.

**Storage**
* **SessionStorage:** Manages Premium membership states securely across page navigations.
* **LocalStorage:** Utilized for persisting lightweight user preferences.

**Deployment**
* **Static Hosting:** Fully compatible with GitHub Pages, Vercel, Netlify, or any standard HTTP static server.

---

## 🏗️ Project Architecture

* **Folder Organization:** The repository is split into logical domains: HTML views (`pages/`), styles (`css/`), logic (`js/`), data models (`data/`), and media (`assets/`).
* **Page Flow:** The application operates as a multi-page application (MPA). Users navigate via standard anchor links, passing state (like Book IDs) through the URL query string (`?id=1`).
* **JSON Flow:** The `books.js` and `details.js` scripts fetch `books.json` asynchronously, parse the array, and inject the mapped data into the DOM.
* **Premium Flow:** The checkout page processes a mock transaction. Upon success, it writes `{ premium: 'true' }` to `sessionStorage`. The global `main.js` script reads this on every page load and dynamically updates the Navbar badge and unlocks premium downloads.
* **Navigation Flow:** Unified navigation logic handled independently on each static page, interconnected with relative paths.
* **Review Flow:** Reviews are handled purely client-side via form submission events that dynamically append new HTML nodes to the review container.
* **Download Flow:** Book downloads execute via a mock button that validates premium state before allowing the action.

---

## 📁 Folder Structure

```text
lumina_books_platform/
├── index.html                 # Main landing page
├── pages/                     # Application views
│   ├── about.html             # The Lumina story and mission
│   ├── book-details.html      # Dynamic book profile view
│   ├── books.html             # Main catalog & filtering page
│   ├── checkout.html          # Premium subscription flow
│   ├── contact.html           # Contact form and details
│   ├── faq.html               # Frequently asked questions
│   ├── login.html             # User authentication UI
│   ├── premium.html           # Premium feature showcase
│   ├── privacy.html           # Privacy policy
│   └── terms.html             # Terms of service
├── css/                       # Modular Stylesheets
│   ├── global.css             # Global resets and CSS variables
│   ├── shared.css             # Shared UI components (navbar, footer, buttons)
│   └── [page].css             # Page-specific modular CSS files
├── js/                        # Client-side Logic
│   ├── main.js                # Global state initialization (Premium UI)
│   ├── books.js               # JSON fetching, filtering, and catalog rendering
│   ├── details.js             # URL parsing and single-book rendering
│   ├── checkout.js            # Mock payment processing
│   └── contact.js             # Contact form handling
├── data/                      # Local Databases
│   └── books.json             # Core book catalog data
└── assets/                    # Static Assets
    └── images/                # Book covers and logos
```

---

## 🚀 Installation

Follow these steps to run the project locally on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/lumina_books_platform.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd lumina_books_platform
   ```

3. **Open the project:**
   You can open the directory in your preferred code editor (e.g., VS Code).

4. **Run locally:**
   Because the project uses asynchronous data fetching (`XMLHttpRequest`), opening the HTML files directly via the `file://` protocol may trigger browser CORS restrictions. 
   
   **Recommended Solution (Live Server):**
   * If using VS Code, install the **Live Server** extension.
   * Right-click `index.html` and select **"Open with Live Server"**.
   * The application will launch automatically in your default browser at `http://127.0.0.1:5500`.

---

## 💡 Usage

* **Browse Books:** Navigate to the "Books" page to view the entire catalog rendered dynamically from `books.json`.
* **Filter:** Use the genre buttons (Fiction, Sci-Fi, History, etc.) to instantly sort the displayed grid.
* **Premium:** Navigate to "Premium" and click "Get Premium" to go through the mock checkout process. Once completed, your session is upgraded.
* **Download:** Click on any book to view its details. If a book is marked as premium, you must be a premium member (via the checkout flow) to initiate the mock download.
* **Feedback:** On the book details page, use the review form to post a dynamic review to the DOM.
* **Contact:** Use the "Contact" page to fill out a mock inquiry form.

---

## 📄 Pages Directory

| Page | Purpose | Main Features |
|------|---------|---------------|
| `index.html` | Landing Page | Hero section, value propositions, navigation entry points. |
| `books.html` | Book Catalog | Grid layout, dynamic rendering, genre filtering. |
| `book-details.html`| Profile View | URL query parsing (`?id=X`), reviews, dynamic UI injection. |
| `checkout.html` | Subscription | Mock credit card validation, `sessionStorage` state updates. |
| `premium.html` | Upsell Page | Feature breakdown, pricing table, call-to-action. |
| `login.html` | Authentication | Clean UI form for user sign-in (Mock flow). |
| `about.html` | Mission & Vision | Features grid, newsletter subscription UI. |
| `contact.html` | Support | Form validation, company address and phone details. |
| `faq.html` | Help Center | Expandable native HTML details/summary toggles. |

---

## 🗄️ JSON Data Structure

The core data of the application lives in `data/books.json`. It is structured as an array of objects.

**Example Field Breakdown:**
```json
{
  "id": 1,
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "genre": "Fiction",
  "coverImage": "assets/images/books/book1.jpg",
  "summary": "Compassionate, dramatic, and deeply moving...",
  "advantages": ["Pulitzer Prize winner", "Tackles social issues"],
  "disadvantages": ["Can be emotionally heavy"],
  "rating": 4.9,
  "price": "14.99",
  "isPremiumRequired": false,
  "reviews": [
    { "user": "Alice", "comment": "A true classic." }
  ]
}
```

* **How to add new books:** Simply append a new JSON object to the array in `books.json`. The `books.js` engine will automatically map it, generate the HTML card, and append it to the `books.html` grid dynamically.

---

## 💎 Premium Workflow

The platform utilizes a strictly client-side architecture to simulate user states.
1. **Subscription:** The user navigates to `premium.html` and selects a tier.
2. **Checkout:** The user fills out a simulated form on `checkout.html`. Upon submission, `checkout.js` executes `sessionStorage.setItem('premium', 'true')`.
3. **Session Storage:** The `main.js` file reads this token on every subsequent page load to inject the "💎 Premium Member" badge into the global navigation bar.
4. **Download:** The `details.js` logic validates `sessionStorage.getItem('premium') === 'true'` before allowing the user to bypass the "Premium Required" lock on restricted books.

---

## 🌟 Project Highlights

* **Dynamic Rendering:** Achieves React-like data population using vanilla JavaScript, drastically reducing bundle size and load times.
* **Responsive Layout:** Exclusively utilizes modern CSS techniques (Grid & Flexbox) with media queries, ensuring pixel-perfect rendering without Bootstrap dependencies.
* **Static Architecture:** Completely decoupled from a backend server, making it incredibly cheap and easy to host on edge networks.
* **Client-Side Implementation:** Showcases advanced DOM manipulation and session management purely in the browser.

---

## 📱 Responsive Design

The application is fully responsive and tested across multiple breakpoints:
* **Desktop (1024px+):** Full grids, expansive navigation bars, and large hero sections.
* **Tablet (768px - 1023px):** Condensed grids (2-column layouts) and adjusted padding.
* **Mobile (Below 768px):** Single-column layouts, stacked inputs, and touch-friendly button targets.

---

## ⚡ Performance

* **Optimized Assets:** The platform relies heavily on native system fonts (`system-ui`) and native emojis, completely eliminating the network latency associated with loading external font files (like Google Fonts or FontAwesome).
* **Modular JavaScript:** Scripts are isolated by page concern (`books.js`, `details.js`), ensuring the browser only executes the logic necessary for the current view.
* **Clean CSS:** Styles are decoupled into `global.css`, `shared.css`, and page-specific stylesheets to prevent massive, unmaintainable CSS files.

---

## ♿ Accessibility

* **Semantic HTML:** Utilizes `<main>`, `<nav>`, `<section>`, `<article>`, and `<details>` tags for proper screen-reader parsing.
* **Readable Typography:** High-contrast text colors against light backgrounds, utilizing standard sizing hierarchies.
* **Form Inputs:** Input fields maintain clear, visual boundaries and predictable focus states.

---

## 🔮 Future Improvements

While this project is feature-complete for its scope, realistic future improvements could include:
* Migrating the static JSON data to a headless CMS (like Contentful or Sanity) or a Node.js/Express REST API.
* Implementing genuine JWT-based authentication in place of the mock `login.html` and `sessionStorage` flow.
* Implementing a client-side routing library to convert the application from a Multi-Page Application (MPA) to a Single-Page Application (SPA).

---

## 🤝 Contributing

Contributions are welcome! If you would like to improve the platform, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Designed and engineered with a passion for clean, framework-free web development.

---

## 🙏 Acknowledgements

* Thanks to the open-source community for providing standard, reliable web documentation via MDN Web Docs.
* Driven by a commitment to mastering fundamental web technologies (Vanilla HTML, CSS, JS) prior to adopting abstract frameworks.

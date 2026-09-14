# DOI KHAM Landing Page

A responsive DOI KHAM promotional landing page built as a lightweight, component-based static website. The page presents the brand, tomato products, story, news, FAQ, contact form, and footer in a single HTML entry point.

## Features

- Responsive landing-page layout for desktop and mobile screens
- DOI KHAM hero, product, brand story, news, FAQ, and contact sections
- Reusable custom elements organized by feature under `components/`
- Component-specific stylesheets plus shared global and footer styles
- JavaScript ES modules for the application entry point
- DOI KHAM browser favicon and branded header/footer presentation
- Semantic HTML structure and accessible labels/navigation where applicable

## Project Structure

```text
.
├── assets/                 # Images and other static assets
├── components/             # Reusable page components and their styles
├── docs/                   # Project documentation and supporting material
├── js/
│   ├── app.js              # Application entry point
│   └── organic-container.js
├── original/               # Original/reference project material
├── styles/
│   ├── global.css          # Shared layout, variables, and global styles
│   └── footer.css          # Footer-specific styles
├── index.html               # Main landing-page document
└── README.md
```

## Main Components

The landing page currently includes these custom elements:

- `doi-kham-hero`
- `doi-kham-tomato-detail`
- `doi-kham-vdo`
- `doi-kham-about`
- `doi-kham-product-gallery`
- `doi-kham-product-line`
- `doi-kham-brand-story`
- `doi-kham-news`
- `doi-kham-faq`

The contact section and footer are defined directly in `index.html`.

## Local Development

This project does not require a build step. Because the application uses JavaScript modules, serve the repository through a local HTTP server rather than opening `index.html` directly with a `file://` URL. MDN notes that module scripts should be tested through a server because local `file://` loading can trigger CORS errors. citeturn134039search0turn134039search6

For example, with Python installed:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Architecture

The project keeps the page entry point in `index.html`, while feature behavior is separated into JavaScript modules and reusable custom elements. The application entry point is loaded with `type="module"`, which is the standard browser mechanism for JavaScript modules and supports the `import` statements used by `js/app.js`. citeturn134039search0turn134039search1

## Styling Conventions

Styles are organized by concern:

- `styles/global.css` contains shared page variables, base layout, and cross-section behavior.
- `styles/footer.css` contains footer-specific layout and responsive behavior.
- Each component in `components/` keeps its feature stylesheet beside the component implementation.

Layout spacing is controlled by parent containers, while component containers handle their own internal layout and spacing.

## Deployment

The site is a static HTML/CSS/JavaScript project and can be deployed to any hosting platform that serves static files, including GitHub Pages or another static web host.

Make sure the deployed environment serves JavaScript files with a JavaScript MIME type and supports ES modules. citeturn134039search0turn134039search2

## Repository

GitHub: https://github.com/0n6k4v-Coder/doi-kham-fan-landing-page

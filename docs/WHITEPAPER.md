# Diag‑Daddy React Application – Technical White Paper

This document serves as a **technical overview and educational companion** for the Diag‑Daddy React application.  It is intended for readers who may be new to modern JavaScript frameworks, 3D rendering on the web, or continuous deployment via GitHub Pages.  Each major file and component is explained in detail to help you understand how the pieces fit together.

## 1. Project Overview

Diag‑Daddy is a single‑page application built with **React**.  It simulates a motorcycle diagnostic training environment where users can interact with a 3D model, access learning material, and measure progress through leaderboards.  The design philosophy emphasises:

* **Modularity** – Each view or piece of functionality is encapsulated in its own file (component) for readability and reusability.
* **Accessibility** – Navigation is consistent across pages and content adapts to smaller screens.
* **Extensibility** – Placeholder pages and modular code allow you to add real training scenarios, charts or authentication later without major rewrites.

## 2. Directory Structure

```
diag-daddy-react/
├── public/                # Static assets and base HTML template
│   ├── index.html         # Mount point for the React app
│   ├── hero-bg.webp       # Background image for the hero section
│   ├── logo.png           # Site logo used in the nav bar
│   └── models/            # 3D models served at runtime
│       └── free_merc_hovercar.glb
├── src/
│   ├── index.js           # Entry point rendering <App />
│   ├── index.css          # Global styles and CSS variables
│   ├── App.jsx            # Top‑level component with routing
│   ├── components/        # Reusable UI pieces
│   │   ├── NavBar.jsx
│   │   ├── Home.jsx
│   │   ├── AboutSection.jsx
│   │   └── InteractiveModel.jsx
│   ├── pages/             # Top‑level pages routed by React Router
│   │   ├── TrainingCenter.jsx
│   │   ├── LearningCenter.jsx
│   │   ├── CompetitiveLearning.jsx
│   │   ├── SignIn.jsx
│   │   └── Register.jsx
│   └── styles/            # Scoped CSS files per component/page
│       ├── NavBar.css
│       ├── Home.css
│       ├── AboutSection.css
│       ├── InteractiveModel.css
│       ├── Page.css
│       └── Auth.css
└── docs/                  # Documentation (this white paper)
    └── WHITEPAPER.md
```

Each folder serves a distinct purpose:

* `public/` – Contains assets that the web server can serve directly.  The **index.html** file defines the `<div id="root">` mount point where React renders the application.  Images and 3D model files live here because the browser can fetch them via relative URLs (e.g. `/models/free_merc_hovercar.glb`).
* `src/` – Holds all React components, pages and styles.  This directory is compiled and bundled by the build tool (Create React App) into static files served from `build/` when you run `npm run build`.
* `docs/` – Houses this white paper.  Having documentation alongside the source helps new contributors onboard quickly.

## 3. Global Configuration

### 3.1 `public/index.html`

This is the base HTML file served to users.  It contains only a root `<div id="root"></div>` and a few meta tags for viewport and character encoding.  React attaches (hydrates) its virtual DOM to this element.  You should not write any business logic here.  Static assets in `public/` are served relative to the site root; for example, `/logo.png` in your HTML will resolve to `public/logo.png`.

### 3.2 `src/index.js`

This is the entry point for the React app.  It imports React, React DOM, the main CSS (`index.css`), and the top‑level `<App />` component.  The file wraps `<App />` in a `<BrowserRouter>` from React Router so your application can respond to URL changes without reloading the page.  Finally, it calls `ReactDOM.createRoot(...).render()` to mount the app.

### 3.3 `src/index.css`

This file defines **global styles** and **CSS custom properties** (variables).  Key variables include:

* `--ink` – The primary dark background colour used across the site.
* `--muted` – A soft accent used for body text.
* `--accent` and `--accent2` – Primary brand colours for buttons and links.
* `--highlight-color` – The colour applied when hovering over parts of the 3D model.  Changing this value updates the highlight in the `InteractiveModel` component.

Global resets (removing default margins and paddings) and utility classes (like `.container` and `.btn`) are also defined here.

## 4. Navigation and Routing

### 4.1 `src/App.jsx`

`App.jsx` is the top‑level component that appears on every page.  It contains:

* `<NavBar />` – The persistent navigation bar at the top of the screen.
* A `<main>` element with `paddingTop: '64px'` so content does not appear beneath the fixed nav bar.
* `<Routes>` with `<Route>` definitions from **React Router**.  Each route maps a path (e.g. `/training`) to a component (e.g. `<TrainingCenter />`).  The final wildcard route (`path="*"`) renders `<Home />` if the user navigates to an unrecognised URL.

### 4.2 `src/components/NavBar.jsx`

The NavBar component renders a fixed bar containing the Diag‑Daddy logo and site name on the left and **Sign In** / **Register** links on the right.  It uses `<NavLink>` from React Router so that the active link receives an `.active` class automatically.  The nav bar styles live in `src/styles/NavBar.css` and use CSS flexbox to distribute space between the left and right sections.

## 5. Landing Page

### 5.1 `src/components/Home.jsx`

This component builds the landing page by composing three sections:

1. **Hero Section** – A full‑width background image with overlayed text and a call‑to‑action button.  When users click the **Start Training** button, you can eventually link it to a sign‑in page or directly into a diagnostic scenario.
2. **Interactive 3D Model Section** – Renders the `InteractiveModel` component described later.  It introduces the highlight colour by referencing the CSS variable `--highlight-color` in the code.
3. **About Section** – Imports and renders `AboutSection`.  Each card in the about section uses a `<Link>` so that clicking takes users to the Training Center, Learning Center or Competitive page.

The hero section styling lives in `src/styles/Home.css`.  It applies a dark overlay to the background image (`public/hero-bg.webp`) to ensure text readability.

## 6. About Section

### 6.1 `src/components/AboutSection.jsx`

The about section explains the purpose of Diag‑Daddy.  It uses three **cards** to summarise the Training Center, Learning Center and Competitive features.  Each card is a `<div>` containing a `<h3>` heading, a paragraph and a `<Link>` from React Router.  The CSS (`AboutSection.css`) arranges these cards in a grid that wraps gracefully on smaller screens.  Hover effects gently elevate cards to encourage user interaction.

## 7. Interactive 3D Model

### 7.1 Technology Stack

The `InteractiveModel.jsx` component uses **React Three Fiber**, a React renderer for the 3D library **Three.js**, along with **@react-three/drei**, a collection of helpful abstractions like `OrbitControls` and `useGLTF`.  These libraries handle the heavy lifting of creating a WebGL context, loading 3D models, and updating them reactively within the React lifecycle.

### 7.2 `InteractiveModel.jsx`

The component is split into two parts:

1. **Model** – An inner component that loads a GLB file and manages pointer interactions.
2. **InteractiveModel** – The wrapper that defines the `<Canvas>` environment.

#### 7.2.1 Model component

* **Loading the model** – `useGLTF(url)` loads the `.glb` file from `public/models/` and caches it internally.  The `url` prop is a relative path such as `/models/free_merc_hovercar.glb`.
* **Pointer handlers** – During the `useEffect` hook, the model traverses each mesh (`child.isMesh`) and assigns:
  - `onPointerOver` and `onPointerOut` handlers to track which mesh is currently hovered.
  - `onClick` to isolate the clicked mesh (see below).
* **Hover highlighting** – `useFrame()` runs on every animation frame.  It iterates through each mesh and checks whether it matches the `hovered` state.  If so, it clones the material, updates its `color` and `emissive` properties to the `highlightColor` prop (a CSS variable), and applies the clone.  When the pointer leaves, the original material is restored.
* **Isolation on click** – When a mesh is clicked, the component saves it as `selected` and clones it to a new object stored in `clone`.  The entire original model (`<group ref={modelRef}>`) is hidden (`visible={!selected}`), and the cloned mesh is rendered separately positioned slightly closer to the camera (`position={[0, 0, 2]}`).  Clicking again deselects and returns to the full model.  This mechanism gives the illusion of pulling a part out of the bike without modifying the original geometry.

#### 7.2.2 InteractiveModel component

This wrapper sets up the `<Canvas>` (from React Three Fiber), defines camera position and lighting, and imports `OrbitControls` so users can rotate, pan and zoom the model.  It also reads the CSS variable `--highlight-color` via `getComputedStyle(document.documentElement).getPropertyValue('--highlight-color')` so designers can customise the highlight colour in CSS instead of touching JavaScript.  The component returns a `<div>` containing the `<Canvas>` and uses `Suspense` to display nothing until the model is loaded.

### 7.3 Customising the Model

To replace the placeholder model with your own motorcycle:

1. Copy your `.glb` file into `public/models/`.  For example: `public/models/yzf-r9.glb`.
2. Edit `InteractiveModel.jsx` and change the `url` prop:

   ```jsx
   <Model url="/models/yzf-r9.glb" highlightColor={highlightColour} />
   ```

3. If your model is large, you can compress it using [glTF Pipeline](https://github.com/CesiumGS/gltf-pipeline) or host it on a CDN and reference the remote URL.

### 7.4 Adjusting the Highlight Colour

Open `src/index.css` and modify:

```css
:root {
  --highlight-color: #ff3366;
}
```

Any valid CSS colour (hex, RGB or HSL) is accepted.  Changing this value updates the highlight instantly without recompiling JavaScript.

## 8. Pages

Pages in the `/src/pages/` directory are high‑level views.  Each page imports a generic `.page` style from `Page.css` to share typography and spacing.  At present these pages are placeholders; they explain upcoming features and provide structure for future development.

### 8.1 TrainingCenter.jsx

Explains the plan for interactive diagnostic scenarios.  In the future you might display a list of motorcycle brands, allow users to select a model, and launch a troubleshooting flow with scoring.  The copy emphasises accuracy and speed to mirror real‑world service environments.

### 8.2 LearningCenter.jsx

Describes educational content such as wiring diagrams, system overviews and service procedures.  This will eventually serve as a knowledge base to support training scenarios.  Interactive diagrams and search functionality can be added here later.

### 8.3 CompetitiveLearning.jsx

Outlines the concept of leaderboards and timed challenges.  Real implementation would require storing scores in a database and presenting rankings filtered by system, brand or difficulty.

### 8.4 SignIn.jsx and Register.jsx

These pages implement simple forms capturing user email and password.  They do **not** perform authentication; instead, they display an alert when submitted.  In a production application you would connect these forms to a backend service (e.g. Firebase, Supabase or your own API) and handle validation, password hashing and session management.  The CSS (`Auth.css`) centres the form on the page and provides subtle focus and hover effects for inputs and buttons.

## 9. Styling

Each component has a matching CSS file under `src/styles/` scoped to that component.  This keeps styles modular and avoids global namespace collisions.  Highlights:

* **NavBar.css** – Defines flex layouts, spacing and hover styles for the navigation bar.  It uses the `--accent2` colour for the active link underline.
* **Home.css** – Styles the hero section with a background image, overlay gradient and responsive text sizes.  It also defines the call‑to‑action button.
* **AboutSection.css** – Arranges the cards in a responsive grid and adds subtle hover elevation.
* **InteractiveModel.css** – Adds a radial gradient and border to the 3D model container to visually separate it from the rest of the page.
* **Page.css** – Provides consistent typography and margins for generic pages (Training Center, Learning Center, etc.).
* **Auth.css** – Centers sign‑in and registration forms, styles labels and inputs, and references the global colours.

Feel free to customise these files to match your brand.  Because we use CSS variables, changes in one place (e.g. `--accent`) propagate automatically.

## 10. Running and Building the App

### Development

To run the project in development mode:

```bash
npm install        # install dependencies
npm start          # start the dev server on http://localhost:3000/
```

The page will reload whenever you change a `.jsx` or `.css` file.  Inspect the browser console for errors if something doesn’t work as expected.

### Production

Building a production version bundles and minifies the code, extracts static assets and optimises everything for performance:

```bash
npm run build
```

This creates a `build/` directory containing static HTML, CSS and JavaScript.  You can host this directory on any static file server (GitHub Pages, Netlify, Vercel, Apache, Nginx, etc.).

## 11. Deployment to GitHub Pages and Custom Domain

Follow these steps to publish your site at `https://diagdaddy.com/`:

1. **Create a GitHub repository** – Visit https://github.com/new and create a public repo named `diag-daddy` (or any name you like).  Do **not** add a README or `.gitignore` there because your local project already has them.
2. **Initialise git locally** – From the root of your project:

   ```bash
   git init
   git remote add origin https://github.com/<your‑username>/diag-daddy.git
   git add .
   git commit -m "Initial commit"
   git push -u origin master
   ```

3. **Create the production build** – Execute `npm run build`.  This yields a `build/` directory ready for deployment.
4. **Configure GitHub Pages** – In your repository on GitHub:
   - Go to **Settings → Pages**.
   - Under **Branch**, select **master** (or `main`) and set **/build** as the folder.
   - Click **Save**.  GitHub will build and deploy your site.  A link will appear once the process completes (usually within a couple of minutes).
5. **Add a custom domain** – Create a file named `CNAME` at the root of your repo (same level as `package.json`).  Its contents should be your domain name:

   ```
   diagdaddy.com
   ```

   Commit and push this file.  Then, in your domain registrar’s DNS settings, create a **CNAME** record pointing `www` to `<your‑username>.github.io`.  Some registrars support `ALIAS` or `ANAME` records to point the root domain (`@`) to the same host.  GitHub Pages documentation lists the exact IP addresses if you choose to use A records instead.
6. **Enable HTTPS** – Back in your repository’s **Settings → Pages**, enter your custom domain and save.  GitHub will automatically obtain an SSL certificate via Let’s Encrypt.  This process can take several minutes to hours depending on DNS propagation.

After completing these steps, your React app will be available at `https://diagdaddy.com/`.

## 12. Conclusion and Future Work

This white paper detailed the structure and purpose of every major file in the Diag‑Daddy React project.  You now have a comprehensive understanding of how the application is put together, how the interactive 3D model is implemented, and how to adapt the project to your own models and colours.  The placeholders in the Training Center, Learning Center and Leaderboards pages should be replaced by real content and functionality as the project evolves.  Additional enhancements could include:

* Adding **authentication** and **user management** via a backend service.
* Building **database connectivity** to store diagnostic scores and progress.
* Creating **interactive wiring diagrams** and linking them to the 3D model.
* Implementing **live leaderboards** with filters (system, brand, difficulty).
* Integrating **analytics** to understand user behaviour and improve learning outcomes.

We hope this guide empowers you to confidently modify, extend and deploy Diag‑Daddy.
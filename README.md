# Diag‑Daddy Training – React Application

This repository contains the source code for **Diag‑Daddy**, a motorcycle diagnostic training platform built with **React**, **React Router**, and **React Three Fiber**.  The goal of this project is to provide a realistic, interactive learning environment where users can explore a 3D motorcycle model, practice fault diagnosis through simulated scenarios, and track their progress—all without touching a real bike.

## Features

- **Interactive 3D model** – Users can rotate a motorcycle model, hover over parts to highlight them and click to isolate individual components.  The highlight colour is customisable via CSS.
- **Hero landing page** – A full‑bleed hero banner introduces the purpose of the app with a call‑to‑action button.
- **About section** – Describes the three pillars of Diag‑Daddy: Training Center, Learning Center and Competitive Learning (Leaderboards).  Each card links to the corresponding page.
- **Multi‑page navigation** – A fixed top navigation bar routes to pages for training, learning, leaderboards, sign‑in and registration using **React Router**.
- **Placeholder pages** – Each major section (training, learning, leaderboards, auth) contains descriptive copy explaining future functionality.  These pages are ready to be fleshed out as features are developed.

## Getting Started

### Prerequisites

You need **Node.js** (version 14 or later) and **npm** installed on your machine.  If you don’t already have them, download from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <your-fork-url>
   cd diag-daddy-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The app will open at **http://localhost:3000/**.  The page will automatically reload when you edit source files.

### Building for Production

To create an optimised production build, run:

```bash
npm run build
```

This outputs a `build/` directory containing static files that can be deployed to any web server.

## Project Structure

```
diag-daddy-react/
├── public/                # Static assets served at the root
│   ├── index.html         # Base HTML template
│   ├── hero-bg.webp       # Hero background image
│   ├── logo.png           # Diag‑Daddy logo
│   └── models/
│       └── free_merc_hovercar.glb
├── src/
│   ├── App.jsx            # Top‑level component and routing
│   ├── index.js           # Entry point rendering <App /> into #root
│   ├── index.css          # Global styles and CSS variables
│   ├── components/
│   │   ├── NavBar.jsx     # Fixed navigation bar
│   │   ├── Home.jsx       # Landing page combining hero, 3D model and about
│   │   ├── AboutSection.jsx
│   │   └── InteractiveModel.jsx
│   ├── pages/
│   │   ├── TrainingCenter.jsx
│   │   ├── LearningCenter.jsx
│   │   ├── CompetitiveLearning.jsx
│   │   ├── SignIn.jsx
│   │   └── Register.jsx
│   └── styles/
│       ├── NavBar.css
│       ├── Home.css
│       ├── AboutSection.css
│       ├── InteractiveModel.css
│       ├── Page.css
│       └── Auth.css
└── README.md             # You are here

```

### Key Files Explained

- **public/index.html** – The HTML template used by React to mount the app.  Do not put application code here.  Static files (images, models) in `public` are served at the root path.

- **src/index.js** – Entry point that renders the `<App />` component into `#root`.  It also wraps the app in a `BrowserRouter` for client‑side routing.

- **src/App.jsx** – Defines the navigation bar and routes.  Each `Route` corresponds to a page component.  Padding is added at the top of `<main>` to account for the fixed nav height.

- **src/components/NavBar.jsx** – A fixed navigation bar with the site logo on the left and sign‑in/register links on the right.  `NavLink` from React Router automatically adds an active class when the path matches.

- **src/components/Home.jsx** – The landing page containing:
  * A **hero section** with a background image and call‑to‑action button.
  * A **3D Interactive Model** section that houses the `InteractiveModel` component.
  * The **About Section** with cards linking to other pages.

- **src/components/AboutSection.jsx** – Describes the Training Center, Learning Center and Competitive Learning sections.  Each card uses a `<Link>` to the corresponding route.

- **src/components/InteractiveModel.jsx** – Uses **React Three Fiber** and **@react-three/drei** to load a `.glb` file (`public/models/free_merc_hovercar.glb` by default).  It provides:
  * Orbit controls so the user can rotate and zoom the model.
  * Highlighting: when you hover a part of the model, the material is cloned and its colour/emissive colour is set to the CSS variable `--highlight-color` defined in `src/index.css`.
  * Isolation: clicking a mesh clones and displays it separately while hiding the rest of the model.  Clicking again (on any part) restores the full model.

- **src/pages/TrainingCenter.jsx**, **LearningCenter.jsx**, **CompetitiveLearning.jsx** – Placeholder pages describing future functionality.  Each uses a common `.page` layout from `Page.css`.

- **src/pages/SignIn.jsx**, **Register.jsx** – Simple forms demonstrating how the sign‑in and registration pages might look.  Real authentication is **not** implemented.  Styles are defined in `Auth.css`.

- **src/styles/*.css** – Modular CSS files for each component.  You can edit these to customise the look and feel.  Global variables (colours, typography) live in `index.css`.

## Customisation

### Switching to your own model

The app ships with a small placeholder model (`free_merc_hovercar.glb`) for testing.  To replace it with your own motorcycle model:

1. Place your `.glb` file in the `public/models/` directory.  For example: `public/models/yzf-r9.glb`.
2. Open `src/components/InteractiveModel.jsx` and change the `url` prop passed to the `<Model />` component:

   ```jsx
   <Model url="/models/yzf-r9.glb" highlightColor={highlightColour} />
   ```

3. Optionally adjust the highlight colour by editing the CSS variable `--highlight-color` in `src/index.css`.

### Colours and Branding

All primary colours are defined in `src/index.css` as CSS variables (`--ink`, `--muted`, `--accent`, `--accent2`, `--highlight-color`).  Modify these to match your desired palette.  Components reference these variables to maintain a consistent theme.

## Publishing on GitHub Pages and diagdaddy.com

If you want to host the site under **diagdaddy.com** using GitHub Pages, follow these steps:

1. **Create a new repository on GitHub**
   - Go to https://github.com/new, choose a repository name (e.g. `diag-daddy`), make it **public**, and do not initialise with a README (we already have one).

2. **Initialise git locally and commit your files**
   ```bash
   cd diag-daddy-react
   git init
   git remote add origin https://github.com/<your‑username>/diag-daddy.git
   git add .
   git commit -m "Initial commit"
   git push -u origin master
   ```

3. **Build the project**
   ```bash
   npm run build
   ```
   This creates a `build/` directory containing static HTML, CSS and JS.

4. **Publish to GitHub Pages**
   - Navigate to your repository on GitHub.
   - Go to **Settings → Pages**.
   - Under **Build and deployment**, choose **Deploy from a branch**.
   - Select the `master` branch (or `main` depending on your default) and set the folder to `/build` (case sensitive).
   - Save.  After a few minutes, GitHub Pages will build and deploy your site.

5. **Set up a custom domain (diagdaddy.com)**
   - Register `diagdaddy.com` through a domain registrar if you haven’t already.
   - In your repository, create a file called `CNAME` (no extension) in the **root** (not inside `src` or `public`).  Its contents should be exactly:

     ```
     diagdaddy.com
     ```

   - Commit and push the `CNAME` file:

     ```bash
     echo diagdaddy.com > CNAME
     git add CNAME
     git commit -m "Add CNAME for custom domain"
     git push
     ```

   - In your DNS provider’s management console, add a **CNAME** record pointing `www` to `<your‑username>.github.io`.  If you want the root domain (without `www`) to work, add an **ALIAS** or **ANAME** record pointing to the same target, or use A records pointing to GitHub’s IP addresses (check GitHub Pages documentation).

   - Back in your GitHub repository under **Settings → Pages**, enter your custom domain and save.  GitHub will automatically configure an HTTPS certificate via Let’s Encrypt.  It can take a while to propagate.

Once these steps are done, visiting `https://diagdaddy.com/` should load your React app.

## Contributing / Extending

This project was created as a teaching tool and an example.  Pull requests are welcome!  You can extend the app by:

- Building real diagnostic scenarios in the Training Center page.
- Adding interactive wiring diagrams to the Learning Center.
- Implementing leaderboards and timed challenges on the Competitive page.
- Integrating authentication and user data persistence on the Sign‑In and Register pages.

## License

This project is open source under the MIT license.
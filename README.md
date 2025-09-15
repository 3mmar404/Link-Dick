# Link-Dick

A lightweight and fast **link management web app** built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/).
The project allows you to **save, manage, and quickly access URLs** in a clean interface.

---

## Features
- ⚡ Built with **Vite** for blazing fast development and production builds.
- 🟦 **TypeScript** support for type-safety and maintainability.
- 🎨 Modular components and hooks for scalability.
- 🌐 Deployed easily on [Netlify](https://www.netlify.com/) or GitHub Pages.
- 📂 Organized project structure:
  - `components/` – Reusable UI elements
  - `hooks/` – Custom React hooks
  - `services/` – Data fetching and API logic
  - `utils/` – Helper functions

---

## Installation & Setup

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/3mmar404/Link-Dick.git
    cd Link-Dick
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start development server:
    ```bash
    npm run dev
    ```
    The app will be running on http://localhost:5173.

4.  Build for production:
    ```bash
    npm run build
    ```
5.  Preview production build:
    ```bash
    npm run preview
    ```

## Deployment
-   Deploy to Netlify
    -   Push the project to GitHub.
    -   Connect your repository on Netlify.
    -   Use the following settings:
        -   Build command: `npm run build`
        -   Publish directory: `dist`
    -   Deploy 🚀

-   Deploy to GitHub Pages
    -   Install gh-pages:
        ```bash
        npm install gh-pages --save-dev
        ```
    -   Add to `package.json`:
        ```json
        "homepage": "https://USERNAME.github.io/Link-Dick",
        "scripts": {
          "predeploy": "npm run build",
          "deploy": "gh-pages -d dist"
        }
        ```
    -   Deploy:
        ```bash
        npm run deploy
        ```

## Screenshots
(Add screenshots of your app UI here)

## Tests (Optional)
-   To run unit tests:
    ```bash
    npm run test
    ```
    (Add Jest/Vitest setup if implemented)

## Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open a PR or issue.

## License
This project is licensed under the MIT License.

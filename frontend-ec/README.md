# initialisation du projet

```javascript
npm create vite@latest frontend-ec -- --template react
cd frontend-ec
npm install

## Installation des dépendances

```javascript
npm install tailwindcss postcss autoprefixer @tailwindcss/forms react-router-dom axios i18next react-i18next i18next-browser-languagedetector @stripe/react-stripe-js @stripe/stripe-js jwt-decode

npm install -D tailwindcss postcss autoprefixer
```

tailwind.config.js

```javascript

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Ajouter les directives Tailwind dans src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

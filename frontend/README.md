# Nayi Disha frontend

This is the only website implementation in this repository. The original demo has been retained, while its files are now organized by responsibility:

## Run

```bash
npm install
npm run dev
```

Vite serves `frontend/index.html`. No React rewrite or duplicate frontend is included.

## Structure

```text
frontend/
├── index.html         # Page shell and external library links
├── css/styles.css     # Global design system, layout, animation, and component styles
├── js/app.js          # Application state, data, rendering, maps, auth, and interactions
└── assets/            # Reserved for local images, icons, and other media
```

## Next cleanup

The major HTML/CSS/JS separation is complete. The remaining work is a gradual split of `js/app.js` into focused modules (`data.js`, `maps.js`, `auth.js`, and screen renderers) and replacing dynamic inline styles with CSS classes. That can be done feature by feature without changing the demo UI.

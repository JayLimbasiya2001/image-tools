## Pixeloop Tools – Free Online Image Tools

Pixeloop Tools is a fast, SEO-optimized React + Vite web app that runs common image tasks entirely in the browser. No backend, no file uploads.

### Tech stack

- **React 18 + TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **react-helmet-async** for SEO meta tags
- **browser-image-compression** for efficient compression

### Development

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

The static build lives in the `dist` folder and can be deployed to Vercel, Netlify, or any static hosting provider.

### Environment / deployment notes

- No environment variables are required.
- For Netlify, ensure an SPA fallback:
  - Add a `_redirects` file with: `/* /index.html 200`
- For Vercel, select the Vite + React template or configure a static build (`npm run build`).


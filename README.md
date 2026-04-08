# Babavali Kotcherla — Portfolio Website

A premium, Apple-inspired personal portfolio for **Babavali Kotcherla**, Software Developer & AI Engineer.
Built with pure HTML, CSS, and JavaScript — zero frameworks, zero dependencies, instant deploy.

---

## Project Structure

```
04092026/
├── index.html              ← Main portfolio page (all sections)
├── style.css               ← Full design system & styles
├── script.js               ← Animations, interactions, canvas
├── BABAVALI_KOTCHERLA.pdf  ← Resume (linked as downloadable)
└── README.md               ← This file
```

---

## Features

- **Apple-inspired dark design** — premium glassmorphism, spacing, and typography
- **Animated canvas hero** — floating gradient orbs, no library needed
- **Typewriter effect** — cycles through role titles
- **Scroll-based reveals** — IntersectionObserver-driven staggered animations
- **Card tilt effect** — subtle 3D perspective on desktop
- **Custom cursor** — smooth lagged ring cursor on pointer devices
- **Counter animations** — numbers count up when the About section enters view
- **Hero parallax** — gentle depth effect on scroll
- **Scroll progress bar** — thin gradient bar at the top of the viewport
- **Mobile responsive** — fully adapted for phones, tablets, and desktops
- **Zero JS dependencies** — no jQuery, no React, no build step
- **SEO-ready** — semantic HTML5, meta tags, and Open Graph

---

## Personalization Checklist

Before deploying, update these placeholders in `index.html`:

| Placeholder | What to replace | Search term |
|---|---|---|
| `https://github.com/` | Your GitHub profile URL | `github.com/` |
| `https://linkedin.com/in/` | Your LinkedIn profile URL | `linkedin.com/in/` |
| Project `href="#"` | Live project / GitHub repo links | `proj-link` |
| Profile photo (optional) | Add `<img src="photo.jpg">` in About section | `about-copy` |

---

## Deploy to Vercel (Recommended — free, instant, shareable link)

1. **Create a GitHub repo** and push this folder to it
2. Go to [vercel.com](https://vercel.com) → sign up / log in (free)
3. Click **"Add New Project"** → **"Import Git Repository"**
4. Select your repo — leave all settings as default
5. Click **"Deploy"**
6. Your live URL: `https://your-project.vercel.app`

> To use a custom domain: Vercel Settings → Domains → Add your domain.

---

## Deploy to Netlify (Drag & Drop — fastest option)

1. Go to [app.netlify.com](https://app.netlify.com) → sign in
2. Drag and drop the **entire project folder** onto the deploy zone
3. Done — you'll get a URL like `https://amazing-name-abc123.netlify.app`
4. Optional: click **"Claim your site"** to rename it to something memorable

**Or via Git:**
1. Push to GitHub
2. Netlify → **"Add new site"** → **"Import from Git"**
3. Connect repo → Deploy

---

## Deploy to GitHub Pages (free, under your GitHub username)

1. Push to a GitHub repo
2. Go to **Settings → Pages**
3. Source: **"Deploy from a branch"** → `main` → `/ (root)`
4. Save and wait ~2 minutes
5. Live at: `https://yourusername.github.io/repo-name`

---

## Local Preview

No build step required — just open `index.html` in your browser:

```bash
# Option 1: open directly
open index.html

# Option 2: use a local server (recommended for fonts/assets)
npx serve .
# or
python3 -m http.server 8080
```

---

## Updating Content

All content lives in `index.html` — each section is clearly commented:

```
<!-- HERO -->
<!-- ABOUT -->
<!-- EXPERIENCE -->
<!-- PROJECTS -->
<!-- SKILLS -->
<!-- EDUCATION -->
<!-- CONTACT -->
<!-- Footer -->
```

Styles are in `style.css` with a clear design token system at the top under `:root { }`.
To change the accent color, update `--blue`, `--violet`, or the `--grad` gradient variable.

---

## Browser Support

| Browser | Version |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Chrome/Safari | iOS 14+, Android 10+ |

---

## License

MIT — free to use, customize, and deploy.

---

*Built for Babavali Kotcherla · Ocean Springs, MS · 2024*

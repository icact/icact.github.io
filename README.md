# ICACT 2026 — Conference Website

Static website for the **2026 IEEE 3rd International Conference on Advanced Computing Technologies (ICACT 2026)**.

- **Dates:** 1–2 September 2026 · Hilton, Kathmandu, Nepal · Hybrid
- **IEEE Conference Record:** [#70625](https://conferences.ieee.org/conferences_events/conferences/conferencedetails/70625)
- **Sponsor:** Technically sponsored by the IEEE Nepal Section
- **Live URL (target):** https://icact.github.io/

## Structure

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About & important dates |
| `call-for-papers.html` | Call for Papers, tracks, submission |
| `committee.html` | Organising & program committee |
| `registration.html` | Registration & fees |
| `venue.html` | Venue, travel & visa |
| `contact.html` | Contact |
| `styles.css` | Shared design system (IEEE masterbrand blue) |
| `app.js` | Shared header/footer, nav, countdown, animations |
| `assets/` | ICACT & IEEE logos (SVG + PNG) |

No build step — plain HTML/CSS/JS. Just open `index.html`.

## Deploying to `https://icact.github.io/`

That exact URL is a **GitHub user/organisation site**, so it must live in a repository literally named `icact.github.io` owned by an account/org named `ieeeicact`. Recommended setup (managed from the **pujaprasad** account):

1. Sign in to GitHub as **pujaprasad**.
2. Create a new **organisation** named **`ieeeicact`** (GitHub → *Settings → Organizations → New organization*, free plan). pujaprasad becomes the owner.
3. Inside that org, create a **public** repository named exactly **`icact.github.io`**.
4. Push the contents of this folder to that repo's default branch:
   ```bash
   git init
   git add .
   git commit -m "ICACT 2026 website"
   git branch -M main
   git remote add origin https://github.com/ieeeicact/icact.github.io.git
   git push -u origin main
   ```
5. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / root**.
6. Wait ~1 minute — the site goes live at **https://icact.github.io/**.

> Alternative (no org): push to a repo under the pujaprasad account instead — it will be served at `https://pujaprasad.github.io/<repo>/`, **not** at `icact.github.io`. The org route above is required for the exact URL.

The `.nojekyll` file is included so GitHub Pages serves all files as-is.

## To finalise before launch

- **Committee names** (`committee.html`) — currently "To be announced".
- **Registration fees** (`registration.html`) — currently "TBA".
- Confirm the **important dates** (note: acceptance 10 Aug currently precedes the 25 Aug submission deadline).

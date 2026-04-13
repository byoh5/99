# Times Table Quiz Playground

A static web quiz service to help learners memorize multiplication tables through repetition, challenge timing, and mistake-focused review.

## Features
- V2 game-first UI flow (Start -> Play -> Result)
- Practice / Challenge / Mistake Review modes
- Hearts, stars, combo, progress HUD, and pause overlay
- Keypad + 4-choice answer input modes
- Browser TTS read-aloud support
- Local history (up to 30 sessions) and mistake TOP list
- Long-form learning content hub (curriculum + mistake remediation docs)
- Embedded learning video page (YouTube-based guided study)

## Run Locally
1. Open `index.html` in any modern browser.
2. Select language/table/mode and start learning.

No backend or build step is required.

## Deployment Policy
- GitHub is used as source control only.
- All preview and production deployments are served from Vercel.
- Current production domain: `https://times-table-quiz-playground.vercel.app`

## Vercel Deployment
1. Keep this repository connected to the existing Vercel project.
2. Leave the framework preset as `Other`.
3. Set `SITE_URL` only when you want canonical/sitemap URLs to point to a custom production domain.
   - Current default: `https://times-table-quiz-playground.vercel.app`
   - Custom domain example: `https://gugudan.example.com`
4. Push to GitHub, then let Vercel build and deploy from the connected repository.

This repository includes:
- `vercel.json`: Vercel build/output configuration
- `scripts/build-static.mjs`: Copies the static site into `dist/` and rewrites SEO URLs
- `package.json`: Local/Vercel build script entrypoint

### Local Vercel-style Build
```bash
SITE_URL=https://your-project.vercel.app npm run build
```

The generated site is written to `dist/`.

## Pages
- `index.html`: Main quiz app
- `app-v2.css`: Main quiz v2 UI style
- `app-v2.js`: Main quiz v2 runtime
- `legal-v2.css`: Legal/about pages visual theme extension
- `guide.html`: Learning guide and FAQ
- `curriculum.html`: 8-week multiplication curriculum and rubric
- `mistake-book.html`: Mistake pattern encyclopedia and correction routines
- `learning-video.html`: Embedded learning video page with quiz-linked routine
- `about.html`: Site/service overview
- `terms.html`: Terms of service
- `privacy.html`: Privacy policy
- `contact.html`: Contact channel
- `ads.txt`: Authorized Digital Sellers declaration
- `robots.txt`: Crawl policy + sitemap location
- `sitemap.xml`: URL discovery map
- `style.css`: Shared style (legal/common)
- `script.js`: Legacy quiz runtime (kept for reference)
- `legal.js`: Legal/about page i18n runtime

## AdSense Readiness Checklist
Before submitting/reviewing in AdSense, confirm:
1. `ads.txt` is publicly accessible at `/ads.txt`.
2. `robots.txt` and `sitemap.xml` are publicly accessible.
3. All policy pages are reachable from every page footer/header.
4. `meta name="google-adsense-account"` is present on each page.
5. Contact and operator info are visible (`about.html`, `contact.html`).
6. Privacy/terms clearly disclose ads, cookies, and child-related guidance.
7. `canonical` URLs match your real production domain.
8. Child-directed or mixed-age traffic is reviewed in Search Console/AdSense and TFCD treatment is configured when applicable.
9. Non-personalized ad request defaults are applied in the page AdSense loader snippet.

## Important
The source files currently use `https://times-table-quiz-playground.vercel.app` as the default canonical/sitemap URL.
When Vercel builds the site, `scripts/build-static.mjs` can rewrite those URLs using `SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, or `VERCEL_URL`.
If you move the production domain again, update `SITE_URL` in Vercel or revise the source URLs in:
- `index.html`
- `about.html`
- `contact.html`
- `privacy.html`
- `guide.html`
- `curriculum.html`
- `mistake-book.html`
- `learning-video.html`
- `terms.html`
- `robots.txt`
- `sitemap.xml`

## License
Free to use for internal or educational purposes.

# Mancini Music

Website for Carol Ann Mancini, voice and piano teacher, organist, and choir director in Wadsworth, Ohio.

Live site: https://mancini-music.github.io/

Static site (HTML, CSS, and JavaScript; no build step):
- `index.html`: content (Home, About, Lessons & Services, Experience, Contact)
- `styles.css`: design and responsive layout
- `script.js`: mobile menu and copyright year
- `images/`: stock photos from Unsplash (free to use under the Unsplash License; credited in the footer)

## Editing
- Edit text directly in `index.html`. Content comes from Carol's resume and her Facebook page.
- After changing `styles.css` or `script.js`, bump the `?v=` number on their links in `index.html` so returning visitors get the new version right away.
- The page has a strict Content Security Policy: scripts, styles, and images must be files in this repository. Inline `<script>` or `style="…"` code will be blocked.

## Deploy
GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root. Changes go live about a minute after each commit.

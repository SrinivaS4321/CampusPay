# CampusPe Landing Page

A responsive CampusPe landing-page recreation built with **vanilla HTML, CSS, and JavaScript**. No React, Next.js, build step, or package installation is required.

## Run locally
1. Download and extract the project ZIP.
2. Open `campuspe-website/index.html` in a browser, or open the folder in VS Code and run `index.html` with the Live Server extension.

## Included
- Responsive header and mobile navigation
- College, job seeker, and employer feature cards
- Sign-in, sign-up, and waitlist modal forms with browser-side validation
- Job-search panel with interactive query feedback
- Hover, focus-visible, active, and subtle entrance states
- Reduced-motion accessibility support
- Partner logo artwork and CampusPe logo assets

## Deploy for a public URL
This is a static site. You can deploy the `campuspe-website` folder using GitHub Pages, Netlify, or Vercel (choose the static/Other framework option; no build command is needed and the output directory is the project root).

### GitHub Pages
1. Create a repository on GitHub and upload the files **inside** `campuspe-website` to the repository root.
2. Open **Settings → Pages**.
3. Under Build and deployment, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
4. Wait for the deployment workflow to finish. GitHub will show the public URL in Settings → Pages.

## Production integration notes
The forms currently validate input and show demo feedback locally; they do not send or persist personal data. Connect them to a backend before collecting real submissions. The job search is a UI demo and needs a jobs API for live listings. The Figma link could not be inspected directly in this environment, so use the provided screenshot as the visual reference and compare against the original Figma frame before final submission.

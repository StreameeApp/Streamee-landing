# Streamee landing page

The Streamee product landing page, built with Next.js, React, and Tailwind CSS.

Live site: https://streameeapp.github.io/Streamee-landing/

## Local development

Use Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000/Streamee-landing/.

## Build and deploy

```sh
npm run lint
npm run build
```

The build exports a static site into `out/`. GitHub Actions builds and deploys
that directory to GitHub Pages on every push to `main`. The repository's Pages
publishing source must be **GitHub Actions**.

The repository path `/Streamee-landing` is configured in `next.config.ts`,
public image paths, and page metadata. Update these together if the repository
name or hosting URL changes.

Local environment files, credentials, browser captures, build output, and
previous Sites hosting configuration are ignored. They are not needed to build
or deploy this static site.

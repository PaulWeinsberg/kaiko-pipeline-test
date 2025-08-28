[![](https://img.shields.io/badge/Fait%20par-Spin%20Interactive-black?style=for-the-badge&labelColor=white)](https://www.spin-interactive.com/)
[![](https://img.shields.io/badge/Avec-Amour-%23f03434?style=for-the-badge&labelColor=f64747)](https://www.spin-interactive.com/)

#22KAI001_WEBAPP
Kaiko - Nuxt | Showcase site

## START
**Developers:**
* Kader
* Karen
* Simon

**Project managers:**
* Joséphine C.

### Prerequisites
To launch the project, you must have:

* [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
* [Node](https://nodejs.org/fr/) >= 20.11.0

To deploy, you need to have:

* [Deployer] (https://deployer.org/)

### Installation
* Run a `$ yarn install`, which should create a "node_modules" folder
* Duplicate the `.env.sample` and rename it to `.env`, then fill in the correct information
* Run a `$ yarn dev` to start the server

And there you have it, you can now access the WebApp.

## Générer un fichier de redirections
```$ yarn redirect:generate [NOM_DU_CSV] [NOM_DU_FICHIER]```

Importer ensuite votre fichier dans `./redirects/index.js`

## DEPLOY
* **Test**
* Using the deployer
* **Preprod**
* Using the deployer
* **Prod**
* Using the deployer

## Cloudflare Pages (Static Deployment)
This project can be exported as a fully static site (consuming the remote WordPress API at runtime from the browser) and deployed on Cloudflare Pages.

### Build command
```
npm run cloudflare:generate
```
or
```
yarn cloudflare:generate
```

### Output directory
Use `dist` as the Cloudflare Pages build output.

### Required environment variables
Set these in the Cloudflare Pages project settings (Environment Variables):

* `API_URL` – Kaiko API base URL
* `API_KEY` – Auth token for API
* `WP_URL` – Public WordPress site root (used to fetch sitemap and build static routes)
* `BASE_URL` – Public site base URL (e.g. https://www.example.com)
* (Optional) `IMAGE_DOMAINS` – Comma-separated list of remote image hostnames used in `<nuxt-image>` components
* Any Axeptio / GTM related vars already present locally

### Redirects
`scripts/generate-cloudflare-redirects.js` creates a `_redirects` file inside `dist` from:
1. Local static lists in `redirects/` (edit `redirects/list/*.js` and aggregate in `redirects/index.js`).
2. Remote API redirects (`GET ${API_URL}/redirects`) when `API_URL` and `API_KEY` are set at build time.

Simple anchored patterns like `^/old-path$` are converted to Cloudflare format. More complex regex are skipped (add them manually to `dist/_redirects` post-build if required). API rules override local ones with the same `from` pattern.

### 404 Handling
Cloudflare will serve `404.html` automatically for missing routes. A custom static `static/404.html` file has been added. A `200.html` fallback is produced by Nuxt for SPA behaviour (`generate.fallback`).

### Notes
* All dynamic data continues to be fetched client-side from the WordPress / API endpoints.
* If you add server middleware, guard it behind `STATIC_DEPLOY` / `CF_PAGES` so it’s excluded from static builds.
* For new dynamic routes ensure they appear in the remote WP sitemaps or extend `generate.routes` to include them manually.

## ACF
Since Kaiko is a multisite, specific management of ACFs has been implemented place.

Please refer to the readme [spininteractive-backoffice](https://github.com/kaikodata/spininteractive-backoffice).
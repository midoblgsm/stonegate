# Stonegate — Texas Hotshot & Dually Hauling

## Project Overview

A professional static landing page for Stonegate, a Texas-based hotshot and dually hauling company. The site showcases transportation services, company information, and a quote request form.

## Tech Stack

- **Frontend:** Plain HTML5, CSS3 (CSS Variables, Flexbox/Grid), Vanilla JavaScript
- **Server (dev):** `serve` npm package serving the `public/` directory on port 5000
- **No build step** — purely static files

## Project Structure

```
public/
  index.html   - Main site (Hero, Services, About, Contact/Quote form)
  styles.css   - Site styling with CSS custom properties
  app.js       - Client-side logic (year update, form submission simulation)
firebase.json  - Firebase Hosting config (not used in Replit dev)
package.json   - npm project with `start` script using `serve`
plan.md        - Business copy and mission notes
```

## Running Locally

The `Start application` workflow runs `npm run start`, which serves the `public/` folder on port 5000 via the `serve` package.

## Deployment

Configured as a **static** deployment with `publicDir: "public"`. No build step needed.

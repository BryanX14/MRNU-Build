# Maple Ridge New & Used Building Materials Website

A modern, responsive website built for **Maple Ridge New & Used Building Materials (MRNU)** using **Eleventy (11ty)**, **Nunjucks**, **Sass (SCSS)**, and **Decap CMS**.

The website is designed to showcase MRNU's wide selection of new and used building materials, promote their services, and provide customers with an easy way to browse products, view new inventory, and get in touch.

---

## Features

- Responsive, mobile-first design
- SEO optimized pages
- Decap CMS integration for managing New Arrivals
- Product category pages
- Contact form
- Image gallery
- Google Maps integration
- XML sitemap
- Robots.txt
- Netlify Forms
- Fast static site generation with Eleventy

---

## Tech Stack

- Eleventy (11ty)
- Nunjucks
- Sass (SCSS)
- JavaScript
- HTML5
- CSS3
- Decap CMS
- Netlify

---

## Pages

- Home
- About
- Windows & Patio Doors
- Interior Doors
- Exterior Doors
- Commercial Doors
- Kitchen & Bathroom Cabinets
- Building Materials
- Salvage Services
- Delivery Services
- Gallery
- New Arrivals
- Contact

---

## Project Structure

```text
src/
├── _data/
├── _includes/
├── assets/
│   ├── css/
│   ├── favicons/
│   ├── fonts/
│   ├── images/
│   ├── js/
│   ├── sass/
│   └── svgs/
├── content/
│   ├── blog/
│   └── pages/
└── index.html
```

---

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

---

## Content Management

New inventory is managed through **Decap CMS**. After publishing new content, Netlify automatically rebuilds and deploys the website.

---

## Deployment

This project is configured for deployment with **Netlify**.

Push changes to the `main` branch to automatically trigger a new deployment.

---

## Author

**Bryan Greig**

Website: https://bryangreig.com
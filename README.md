## Overview

This project is a technical assessment that implements a Shopify product card component using the Dawn theme as a base. It leverages TailwindCSS for styling and includes modern development tooling.

## Live Preview

https://test-liquid-product-card.myshopify.com/collections/all

## Tech Stack

- Shopify Dawn Theme (v15.3.0)
- TailwindCSS (v4.1.4)
- Liquid Templates
- JavaScript
- Prettier (with Shopify Liquid and Tailwind plugin)

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

The project uses concurrently to run both the Shopify theme development server and TailwindCSS watcher:

```bash
npm run dev
```

This will:
- Start the Shopify theme development server
- Watch and compile TailwindCSS styles

## Theme Configuration

Theme settings are configured in `shopify.theme.toml`.




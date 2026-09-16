# HITUDE storefront

## Development

```bash
npm install
npm run dev
```

The storefront runs at `http://localhost:3000` and talks to `NEXT_PUBLIC_API_URL`. Public product content has a static seed fallback so SEO-critical pages remain useful while the API is unavailable during local setup; cart/account mutations use the REST API when configured.

## Production notes

- Authentication is expected to use secure, HTTP-only cookies issued by the API. The frontend never writes auth tokens to localStorage.
- Add verified product media to `public/` or a signed image CDN before launch; the included pack visuals are intentionally brand-safe placeholders.
- Configure analytics only after consent and replace all verification-required content with approved data.

# hitude-frontend

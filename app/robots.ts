import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots { const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'; return { rules: [{ userAgent: '*', allow: '/', disallow: ['/account', '/admin', '/cart', '/checkout', '/login', '/register', '/forgot-password', '/reset-password', '/verify-email', '/shop?'] }], sitemap: `${base}/sitemap.xml` }; }


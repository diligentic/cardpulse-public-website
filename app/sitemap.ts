import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { return ['', '/how-it-works', '/pricing', '/privacy-security', '/about', '/contact'].map(path => ({ url: `https://cardpulse.com${path}`, changeFrequency: 'monthly', priority: path ? .7 : 1 })); }

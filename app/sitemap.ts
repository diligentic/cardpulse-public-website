import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { return ['', '/how-it-works', '/pricing', '/privacy-security', '/about', '/contact', '/privacy', '/terms', '/data-deletion'].map(path => ({ url: `https://dovvy.ca${path}`, changeFrequency: 'monthly', priority: path ? .7 : 1 })); }

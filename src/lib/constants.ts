export const siteConfig = {
  name: 'WEKA',
  description: 'WEKA Sanity + Next.js',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const;

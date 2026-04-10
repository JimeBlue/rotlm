export default defineEventHandler((event) => {
  const baseUrl = 'https://rotlm.com'

  const staticPages = [
    // German (default — no prefix)
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/music', priority: '0.8', changefreq: 'monthly' },
    { loc: '/gigs', priority: '0.9', changefreq: 'weekly' },
    { loc: '/merch', priority: '0.7', changefreq: 'weekly' },
    { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
    { loc: '/impressum', priority: '0.3', changefreq: 'yearly' },
    { loc: '/datenschutz', priority: '0.3', changefreq: 'yearly' },
    // English
    { loc: '/en/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/en/music', priority: '0.8', changefreq: 'monthly' },
    { loc: '/en/gigs', priority: '0.9', changefreq: 'weekly' },
    { loc: '/en/merch', priority: '0.7', changefreq: 'weekly' },
    { loc: '/en/contact', priority: '0.6', changefreq: 'monthly' },
    // Italian
    { loc: '/it/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/it/music', priority: '0.8', changefreq: 'monthly' },
    { loc: '/it/gigs', priority: '0.9', changefreq: 'weekly' },
    { loc: '/it/merch', priority: '0.7', changefreq: 'weekly' },
    { loc: '/it/contact', priority: '0.6', changefreq: 'monthly' },
    // Spanish
    { loc: '/es/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/es/music', priority: '0.8', changefreq: 'monthly' },
    { loc: '/es/gigs', priority: '0.9', changefreq: 'weekly' },
    { loc: '/es/merch', priority: '0.7', changefreq: 'weekly' },
    { loc: '/es/contact', priority: '0.6', changefreq: 'monthly' },
  ]

  const urls = staticPages
    .map(
      page => `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  setResponseHeader(event, 'Content-Type', 'application/xml')
  return xml
})

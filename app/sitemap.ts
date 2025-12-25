import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryDomain = 'https://prodverse.co'
  const alternateDomain = 'https://prodverse.net'

  const pages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/#features', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/#ai', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/#collaborate', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/#pricing', changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add entries for primary domain (prodverse.co)
  pages.forEach((page) => {
    sitemapEntries.push({
      url: `${primaryDomain}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // Add entries for alternate domain (prodverse.net)
  pages.forEach((page) => {
    sitemapEntries.push({
      url: `${alternateDomain}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority * 0.9, // Slightly lower priority for alternate domain
    })
  })

  return sitemapEntries
}

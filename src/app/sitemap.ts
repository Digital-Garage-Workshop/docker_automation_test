import { MetadataRoute } from 'next'

async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://web.genuineparts.mn/';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/category`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
        url: `${baseUrl}/faq`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/payment`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/payment/checkout`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/payment/address`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/payment/login`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/payment/success`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];



  return [...staticPages]; 
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSitemap();
}

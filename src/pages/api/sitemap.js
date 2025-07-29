// src/pages/api/sitemap.js

import { getFilteredTours } from "@/utils/crudModels/Tour";
import connectDB from "@/utils/connectDB";

const SITE_URL = "https://turino-project.vercel.app";

function generateSiteMap(tours) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Static Pages -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/travel-services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about-us</loc>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact-us</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Dynamic Tours -->
  ${tours
    .map((tour) => {
      const lastmod = tour.updatedAt || tour.createdAt || new Date().toISOString();
      return `
  <url>
    <loc>${SITE_URL}/tour-detail/${tour._id}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    })
    .join("")}

</urlset>`;
}

export default async function handler(req, res) {
  try {
        await connectDB();

    let tours = await getFilteredTours(req.query);


    const sitemap = generateSiteMap(tours);

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).end();
  }
}

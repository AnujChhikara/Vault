/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || '<https://www.devvault.xyz/>',
  generateRobotsTxt: true, // optional
  // other configurations...
}
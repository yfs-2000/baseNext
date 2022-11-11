//站点地图配置
module.exports = {
    siteUrl: process.env.SITE_URL || "默认网址",
    generateRobotsTxt: true,
    sitemapSize: 5000,
    /*additionalPaths: async (config) => [
      await config.transform(config, "/filter/bags"),
      await config.transform(config, "/filter/watches"),
    ],*/
    /*exclude: ["/server-sitemap.xml"], // <= exclude here
    robotsTxtOptions: {
      additionalSitemaps: [
        process.env.SITE_URL + "server-sitemap.xml", // <==== Add here
      ],
    },*/
};
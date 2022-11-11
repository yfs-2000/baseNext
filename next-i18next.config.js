module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "cn"],
  },
  reloadOnPrerender: process.env.NEXT_PUBLIC_ENV === "development",
  defaultNS: ["common"],
};

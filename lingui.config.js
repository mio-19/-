/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["zh-TW", "en-NZ"],
  sourceLocale: "en-NZ",
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
};
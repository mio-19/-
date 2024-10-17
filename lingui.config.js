/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["zh-TW", "en-NZ"],
  sourceLocale: "en-NZ",
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/messages",
      include: ["app"],
    },
  ],
  format: "po",
};
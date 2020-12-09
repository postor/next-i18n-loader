const { join } = require('path')

module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    i18n: {
      locales: ['en', 'zh'],
      defaultLocale: 'en'
    },
    webpack: (config, options) => {
      config.module.rules.unshift({
        test: /\.js/,
        use: {
          loader: join(__dirname, 'lib', 'loader.js'),
          options: {
            translateModule: join(__dirname, 'utils', 'translate.js'),
            componentsRegex: /\/components\//,
            commonjs: false
          }
        },
      })

      return config
    }
  }
}
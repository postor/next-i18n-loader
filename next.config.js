const { join } = require('path')

module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    i18n: {
      locales: ['en', 'zh'],
      defaultLocale: 'en'
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.js/,
        use: {
          loader: join(__dirname, 'lib', 'loader.js'),
          options: {
            includes: [
              'pages',
              'components'
            ],
            ecmaVersion: 2020
          }
        },
        exclude: /node_modules|_app\.js/
      })

      // console.log(config.module.rules)
      return config
    }
  }
}
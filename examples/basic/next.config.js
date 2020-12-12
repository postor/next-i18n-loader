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
          loader: 'next-i18n-loader/lib/loader.js',
          options: {
            includes: [
              'pages',
              'components'
            ]
          }
        },
        exclude: /node_modules|_app\.js/
      })

      // console.log(config.module.rules)
      return config
    }
  }
}
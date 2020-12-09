const { getOptions } = require('loader-utils')
const convert = require('./convert')

const COMPONENT_KEYWORD = '@next-i18n-loader component'
  , PAGE_KEYWORD = '@next-i18n-loader component'

module.exports = function (source = '') {
  const { commonjs = false, translateModule, componentsRegex } = getOptions(this)
  if (!translateModule) throw `translateModule needed for next-i18n-loader`
  if (!componentsRegex) throw `componentsRegex needed for next-i18n-loader`
  if (source.includes(COMPONENT_KEYWORD)) {
    return convert(source, componentsRegex, commonjs)
  }
  if (source.includes(PAGE_KEYWORD)) {
    return convert(source, componentsRegex, commonjs, true, translateModule)
  }
  return source
}

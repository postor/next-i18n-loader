const { sep, join } = require('path')
const { getOptions } = require('loader-utils')
const convert = require('./convert')
const matchPath = require('./match-path')
const { resolve } = require('upath')

module.exports = function (source = '') {
  const { resourcePath, rootContext } = this
  const { includes = [] } = getOptions(this)

  if (matchPath(includes, resourcePath, rootContext)) {
    return convert(source, p => matchPath(includes, resolve(resourcePath, p), rootContext))
  }
  return source
}

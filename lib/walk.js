const { extend } = require('acorn-jsx-walk')
const walk = require('acorn-walk')

extend(walk.base)

module.exports = walk
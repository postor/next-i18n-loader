
module.exports.getImportStr = function getImportStr(name = '', module = '', commonjs = false) {
  return commonjs
    ? `const ${name} = require(${module})`
    : `import ${name} from ${module}`
}

module.exports.getExportStr = function getExportStr(name = '', value = '', commonjs = false) {
  return commonjs
    ? `module.exports.${name} = ${value})`
    : `export const ${name} = ${value}`
}

module.exports.COMPONET_TOTRANS_EXPORT = 'next_i18n_loader_translation_data'


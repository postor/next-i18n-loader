
const walk = require('./walk')
const MyParser = require('./Parser')

const T_FUNCTION_NAME = 't'
  , CUR_PAGE_TRANS_NAME = 'next_i18n_loader_cur_page_trans'
  , COMPONET_TOTRANS_EXPORT = 'next_i18n_loader_translation_data'

function convertComp(
  source = '',
  matchPath = () => { },
  ecmaVersion
) {
  let parsed = MyParser.parse(source, { sourceType: 'module', ecmaVersion })
  let transArr = [], importArr = [], componentExport = ''
  walk.simple(parsed, {
    CallExpression(node) {
      if (node.callee.name === T_FUNCTION_NAME) {
        transArr.push(node.arguments[0].raw)
      }
    },
    ImportDeclaration(node) {
      let p = node.source.value
      if (p.startsWith('.') && matchPath(p)) {
        importArr.push(node.source.raw)
      }
    },
    ExportDefaultDeclaration(node) {
      componentExport = node.declaration.name
    }
  })
  let importStrs = []
    , tansValues = [CUR_PAGE_TRANS_NAME]
  for (let i = 0; i < importArr.length; i++) {
    let tname = `${COMPONET_TOTRANS_EXPORT}_${i}`
    importStrs.push(getImportStr(`{default as ${tname}}`, importArr[i]))
    tansValues.push(`${tname}.translationKeys||[]`)
  }

  let rtn = [
    source,
    importStrs.join(';\n'),
    `const ${CUR_PAGE_TRANS_NAME} = [${transArr.join(',')}]`,
    setTranslationCode(componentExport, tansValues)
  ].join(';\n')

  // console.log(rtn)
  return rtn
}

module.exports = convertComp

function setTranslationCode(name, tansValues) {
  return `\n;${name}.translationKeys = Array.from(new Set([${tansValues.join(',')
    }].flat(1)))`
}

function getImportStr(name = '', module = '') {
  return `import ${name} from ${module}`
}
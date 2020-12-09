
const walk = require('./walk')
const MyParser = require('./Parser')
const { getImportStr, COMPONET_TOTRANS_EXPORT, getExportStr } = require('./util')

const T_FUNCTION_NAME = 't'
  , CUR_PAGE_TRANS_NAME = 'next_i18n_loader_cur_page_trans'
  , PAGE_TRANS_PROP_NAME = 'translationData'
  , TRANS_FUNC_NAME = 'next_i18n_loader_translate'

function convertComp(source = '', componentsRegex = /\/components\//, commonjs = false, isPage = false, translateModule = '') {
  let parsed = MyParser.parse(source, { sourceType: commonjs ? 'script' : 'module' })
  let transArr = [], importArr = [], pageExport = ''

  walk.simple(parsed, {
    CallExpression(node) {
      if (node.callee.name === T_FUNCTION_NAME) {
        transArr.push(node.arguments[0].raw)
      }
    },
    ImportDeclaration(node) {
      componentsRegex.test(node.source.raw) && importArr.push(node.source.raw)
    },
    ExportDefaultDeclaration(node) {
      if (!isPage) return
      pageExport = node.declaration.name
    }
  })
  let importStrs = isPage
    ? [`import ${TRANS_FUNC_NAME} from ${translateModule}`]
    : []
    , tansValues = [CUR_PAGE_TRANS_NAME]
  for (let i = 0; i < importArr.length; i++) {
    let tname = `${COMPONET_TOTRANS_EXPORT}_${i}`
    importStrs.push(getImportStr(`${COMPONET_TOTRANS_EXPORT} as ${tname}`, importArr[i], commonjs))
    tansValues.push(`...(${tname}||[])`)
  }

  return [
    importStrs.join(';\n'),
    `const ${CUR_PAGE_TRANS_NAME} = [${transArr.join(',')}]`,
    source,
    isPage
      ? getPageInitPropStr(pageExport)
      : getExportStr(COMPONET_TOTRANS_EXPORT, `[${tansValues.join(',')}]`, commonjs)
  ].join(';\n')
}

module.exports = convertComp


function getPageInitPropStr(name) {
  return `;(()=>{
    let oldGetInitialProps = ${name}.getInitialProps||()=>Promise.resolve()
    ${name}.getInitialProps = async(ctx)=>{
      let ${PAGE_TRANS_PROP_NAME} = {}, transKeys=[...(new Set(${CUR_PAGE_TRANS_NAME}))]
      let [oldProps,transResults] =Promise.all([
        oldGetInitialProps(ctx),
        Promise.all(transKeys.map(x=>${TRANS_FUNC_NAME}(x,)))
      ]
    })
  })()`
}
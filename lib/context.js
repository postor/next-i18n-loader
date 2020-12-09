const { createContext, useContext } = require('react')
const interpolate = require('interpolate')

const I18nContext = createContext({})
const interpolateOptions = { delimiter: '{{}}' }

const I18nProvider = ({ children, translationData }) => {
  return (<I18nContext.Provider value={{
    t: (text, values = {}) => interpolate(translationData[text] || text, values, interpolateOptions),
  }}>{children}</I18nContext.Provider>)
}

const useTranslate = () => useContext(I18nContext)

module.exports.I18nProvider = I18nProvider
module.exports.useTranslate = useTranslate
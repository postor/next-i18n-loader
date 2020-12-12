# next-i18n-loader

基于 webpack loader 的 next.js 多国语言方案 | i18n for next.js based on webpack loader 

## 特性 | features

- （针对i18next）无需提前指定 namespace，自动按需加载翻译 | no need to specify namespace, get translations in need
- 可以使用翻译 API 实现网站翻译 | can use tranlation api instead of human work 
- next v10


## 示例 | example

```
cd examples/basic
npm i
node ./translate-server.js
# 另开命令行窗口 | in another shell
npm run dev
# http://localhost:3000
```

## 使用 | usage

初始化 next v10 项目 | init next v10

```
npm init -y
npm i next react react-dom next-i18n-loader axios -S
```


配置 i18n 和 loader | config i18n and loader

```
// next.config.js
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
```

定义 `_app.js` | define `_app.js`

```
// pages/_app.js
import App from 'next/app'
import SelectLanguage from "../components/SelectLanguage"
import getTranslationData from '../get-translation'
import { I18nProvider } from "next-i18n-loader/lib"


function MyApp({ Component, pageProps, translationData }) {
  return (<I18nProvider translationData={translationData}>
    <SelectLanguage />
    <Component {...pageProps} />
  </I18nProvider>)
}

MyApp.getInitialProps = async (appContext) => {
  let { router, Component } = appContext
  // console.log(router, Component, { translationKeys: Component.translationKeys })
  const [appProps, translationData] = await Promise.all([
    App.getInitialProps(appContext),
    getTranslationData(Component.translationKeys, router.locale, router.defaultLocale)
  ])
  return { ...appProps, translationData }
}

export default MyApp
```

定义获取翻译方法 | define how to get translations

```
// get-translation.js

import axios from 'axios'
const instance = axios.create()

async function translate(text, to, from) {
  // 查看翻译服务代码 ./translate-server.js | check translate server code at ./translate-server.js
  let res = await instance.get('http://localhost:3001', { params: { text, to, from } })
  return res.data
}

async function getTranslationData(keys = [], to, from) {
  if (to === from) return {}
  let rtn = {}
  let values = await Promise.all(keys.map(x => translate(x, to, from)))
  for (let i = 0; i < keys.length; i++) {
    rtn[keys[i]] = values[i]
  }
  return rtn
}

export default getTranslationData
```

然后开发组件 | then code components

```
// components/Hello.js
import useTranslation from "next-i18n-loader/lib"

const Hello = () => {
  let { t } = useTranslation()
  return (<div>{t('Hello {{name}}', { name: 'Josh' })} from component Hello</div>)
}

export default Hello
```

和页面即可 | and pages

```
// pages/index.js
import Hello from '../components/Hello'
import useTranslation from 'next-i18n-loader/lib'

const Index = (props) => {
  let { t } = useTranslation()
  return (<div>
    <p>{t('Welcome')}</p>
    <Hello />
  </div>)
}

Index.getInitialProps = async (ctx) => {
  return { a: 1 }
}
export default Index
```

切换语言 | change language

```
// components/SelectLanguage.js 
import { useRouter } from 'next/router'

const SelectLanguage = () => {
  let { locale, locales, pathname, asPath, push } = useRouter()
  return (<select
    value={locale}
    onChange={e => push(pathname, asPath, { locale: e.target.value })}>
    {locales.map(x => (<option
      key={x}
      value={x}>{x}</option>))}
  </select>)
}

export default SelectLanguage
```
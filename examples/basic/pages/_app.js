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
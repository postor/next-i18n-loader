import SelectLanguage from "../components/SelectLanguage"
import { I18nProvider } from "../lib/context"

function MyApp({ Component, pageProps }) {
  const { translationData = {} } = pageProps
  return (<I18nProvider translationData={translationData}>
    <SelectLanguage />
    <Component {...pageProps} />
  </I18nProvider>)
}

export default MyApp
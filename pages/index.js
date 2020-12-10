// @next-i18n-loader page

import Hello from '../components/Hello'
import useTranslation from '../lib'
const Index = (props) => {
  let { t } = useTranslation()
  return (<div>
    <p>{t('Welcome')}</p>
    <Hello />
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>)
}

Index.getInitialProps = async (ctx) => {
  // const { router } = ctx
  // console.log(ctx)
  return { a: 1 }
}
export default Index
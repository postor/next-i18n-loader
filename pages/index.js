// @next-i18n-loader page

import Hello from '../components/Hello'

const Index = () => {
  let { t } = useTranslation()
  return (<div>
    <p>{t('Welcome')}</p>
    <Hello />
  </div>)
}
export default Index
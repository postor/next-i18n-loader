import useTranslation from "../lib"

const Hello = () => {
  let { t } = useTranslation()
  return (<div>{t('Hello {{name}}', { name: 'Josh' })} from component Hello</div>)
}

export default Hello
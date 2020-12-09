import { useRouter } from 'next/router'

const SelectLanguage = () => {
  let { locale, locales, pathname, asPath, push } = useRouter()
  return (<select onChange={e => push(pathname, asPath, { locale: e.target.value })}>
    {locales.map(x => (<option
      key={x}
      selected={locale === x}
      value={x}>{x}</option>))}
  </select>)
}

export default SelectLanguage
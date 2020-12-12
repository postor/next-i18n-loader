
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
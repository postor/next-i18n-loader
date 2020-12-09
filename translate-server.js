
const express = require('express')
const app = express()
const port = 3001

const dic = {
  'zh-CN': {
    'hello': '你好',
    'welcome': '欢迎'
  }
}

app.get('/', (req, res) => {
  // from is not used in this case, but may be useful when you use google translate
  const { text, to, from } = req.query
  res.send(dic[to][text.toLowerCase()])
})

app.listen(port, () => {
  console.log(`translate server listening at http://localhost:${port}`)
})

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001


const dic = {
  'zh': {
    'Hello {{name}}': '{{name}} 你好',
    'Welcome': '欢迎'
  }
}
app.use(cors())
app.get('/', (req, res) => {
  // from is not used in this case, but may be useful when you use google translate
  const { text, to, from } = req.query
  try {
    res.send(dic[to][text])
  } catch (e) {
    res.send('')
  }
})

app.listen(port, () => {
  console.log(`translate server listening at http://localhost:${port}`)
})
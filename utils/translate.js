import axios from 'axios'
const instance = axios.create()

export default async (text, to, from) => {
  let res = await instance.get(`http://localhost:3001`, { params: { text, to, from } })
  return res.data
} 
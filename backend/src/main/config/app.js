import express, { json, Router } from 'express'
import { Server } from 'http'
import userRoutesFactory from '../routes/user-route'

const app = express()
const router = Router()
userRoutesFactory(router)
const cors = (req, res, next) => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  res.type('json')
  return next()
}
app.use(cors)
app.use(json())
app.use(router)

const server = new Server(app)
export default server
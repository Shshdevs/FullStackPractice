import cors from 'cors'
import express from 'express'
import { applyTrcpToExpressApp } from './lib/trpc'
import { trpcRouter } from './router/index'

const expressApp = express()

expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

applyTrcpToExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})

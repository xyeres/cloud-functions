import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

const app = express();
app.use(cors({ origin: true }))

app.get('/cat', (req, res) => {
  res.send('cat')
})

app.get('/dog', (req, res) => {
  res.send('dog')
})

export const api = functions.https.onRequest(app)
import * as functions from 'firebase-functions'

import * as admin from 'firebase-admin'

admin.initializeApp()

export const basicHTTP = functions.https.onRequest((req, res) => {
  const name = req.query.name;

  if (!name) {
    res.status(400).send('You must supply a name')
  }

  res.send(`Hello ${name}!`)
})
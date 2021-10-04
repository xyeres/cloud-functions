import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { Twilio } from 'twilio'

const credentials = functions.config().twilio

const client = new Twilio(credentials.sid, credentials.key)

const db = admin.firestore()

export const sendText = functions.https.onCall(async (data, context) => {
  const userId = 'foo';

  const userRef = db.doc(`users/${userId}`)
  const userSnap = await userRef.get()

  const number = userSnap.data()?.phoneNumber
  return client.messages.create({
    body: data.message,
    to: number,
    from: '+19252737219'
  })

})
import * as functions from 'firebase-functions'

import * as admin from 'firebase-admin'

const db = admin.firestore();

export const createUserRecord = functions.auth
  .user()
  .onCreate((user, context) => {
    const userRef = db.doc(`users/${user.uid}`)

    // Do stuff to the user doc, like add additional profile data,
    // or calculations
    // Must return this promise or the func will error out
    return userRef.set({
      name: user.displayName,
      createdAt: context.timestamp,
      nickname: 'bubbbble boy'
    })
  })
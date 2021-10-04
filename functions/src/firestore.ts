import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const db = admin.firestore()

/*
  Example of data aggregation function on a Firestore document create

  to test: 
    npm run shell
    gameCount({ uid: 'foo' })
*/

export const gameCount = functions.firestore
  .document('games/{gameId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data()

    const userRef = db.doc(`users/${data.uid}`);

    const userSnap = await userRef.get();
    let userData = userSnap.data();

    if (userData) {
      return userRef.update({
        gameCount: userData.gameCount + 1
      })
    } else {
      return new Error('Error fetching user')
    }

  })

/*
  An onUpdate cloud function

  to test, you need to send a before snapshot and an after snapshot like so:
  userTrend({ before: { uid: 'foo', score: 500 }, after: {uid: 'foo', score: 700} })
*/

export const userTrend = functions.firestore
  .document('games/{gameId}')
  .onUpdate(async (snapshot, context) => {
    const before = snapshot.before.data()
    const after = snapshot.after.data()

    let trend;

    if (after.score >= before.score) {
      trend = 'your score is improving'
    } else {
      trend = 'you are on the decline'
    }

    const userRef = db.doc(`users/${after.uid}`)

    return userRef.update({ trend })


  })
// import * as functions from "firebase-functions";

// Registry where you export things that get deployed
export { basicHTTP } from './http'
export { api } from './express'
export { createUserRecord } from './auth'
export { gameCount, userTrend } from './firestore'
export { sendText } from './callable';
export { resizeAvatar } from './resizeImage'
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

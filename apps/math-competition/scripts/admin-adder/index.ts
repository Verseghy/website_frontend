import * as admin from 'firebase-admin'

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vfgmath.firebaseio.com',
})

admin.auth().setCustomUserClaims('CO0d6KROlGf74AUdjJPvbEw5Lal2', { admin: true }).then(console.log)

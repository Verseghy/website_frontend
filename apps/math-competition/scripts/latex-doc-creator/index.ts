import * as admin from 'firebase-admin'

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vfgmath.firebaseio.com',
})

const firestore = admin.firestore()

firestore
  .collection('problems')
  .get()
  .then(async (docs) => {
    const documents = []
    for (const firestoreElement of docs.docs) {
      documents.push(await firestoreElement.data())
    }
    documents.sort((a, b) => a.id - b.id)

    for (const document of documents) {
      console.log('\\section{Feladat}')
      if (document.hasImage) {
        console.log('')
        console.log(`
        \\begin{figure}[H]
            \\centering
            \\adjustbox{max width=\\linewidth}{\\includegraphics[width=\\textwidth]{${document.id}.png}}
        \\end{figure}
        `)
        console.log('')
      }
      console.log(document.text)
      console.log('')
    }
  })

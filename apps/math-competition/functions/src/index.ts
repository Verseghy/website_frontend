import * as functions from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const admin = firebaseAdmin.initializeApp()

export const rate = functions
  .region('europe-west1')
  .runWith({memory: '128MB'})
  .https.onRequest(async (request, response) => {
    interface RateRequest {
      problems?: number
      web?: number
      feedback?: string
    }
    interface RateResponse {
      ok: boolean
      error: any
    }

    const req = request.body as RateRequest
    const res = {} as RateResponse

    try {
      const document: RateRequest = {}
      if (req.problems) document.problems = req.problems
      if (req.web) document.web = req.web
      if (req.feedback) document.feedback = req.feedback

      await admin.firestore().collection('ratings').add(document)

      res.ok = true
      response.status(200).send(res)
    } catch (e) {
      console.log(e)
      res.ok = false
      res.error = e
      response.status(500).send(res)
    }
  })

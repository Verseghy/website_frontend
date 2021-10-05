// @ts-ignore
import firebase from 'firebase'
import firestore = firebase.firestore

export interface Time {
  startTime: firestore.Timestamp
  endTime: firestore.Timestamp
}

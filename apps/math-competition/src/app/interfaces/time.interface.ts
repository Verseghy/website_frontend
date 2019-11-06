import * as firebase from 'firebase';

export interface Time {
  startTime: firebase.firestore.Timestamp
  endTime: firebase.firestore.Timestamp
}

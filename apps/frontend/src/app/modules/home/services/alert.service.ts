import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AlertMessage } from '../models/alert-message'
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private firestore: AngularFirestore) {}

  getAlertMessages(): Observable<AlertMessage[]> {
    return this.firestore.collection<AlertMessage>('messages').valueChanges()
  }
}

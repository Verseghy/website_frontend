import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { Competition } from '../models/competition'

@Injectable({
  providedIn: 'root',
})
export class CompetitionsService {
  constructor(private firestore: AngularFirestore) {}

  getRecentCompetitions(): Observable<Competition[]> {
    return this.firestore.collection<Competition>('competitions', ref => ref.where('year', '>=', new Date().getFullYear())).valueChanges()
  }
}

import { Injectable } from '@angular/core';
import { of } from 'rxjs'
import { delay, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  getArchives () {
    return of({
      "2019-03": [
        {id: 24, title: "Test1", description: "Irure sunt dolore ut eiusmod fugiat occaecat sunt voluptate. Nisi eu amet qui Lorem cupidatat. Est officia sit adipisicing cupidatat ut excepteur cillum anim tempor sunt amet cillum. Exercitation fugiat Lorem magna magna sit nisi adipisicing labore. Culpa dolore qui sunt cillum velit esse quis sunt aliqua non Lorem nostrud nisi. Duis elit occaecat dolore nulla cillum incididunt est enim aute. Nostrud excepteur mollit elit commodo anim qui exercitation nisi nulla eu amet.", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test2", description: "Consequat tempor magna cupidatat occaecat eu officia laborum sint veniam aliqua. Tempor aliquip pariatur velit in qui do. Quis magna culpa sunt fugiat. Anim nulla magna labore commodo qui sit proident excepteur ad excepteur nulla.", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test3", description: "Dolore esse exercitation et nisi id ut sit consequat cillum nisi. Et elit enim dolore ex culpa non. Reprehenderit sint ad occaecat laborum. Elit duis labore aliqua aliqua labore qui adipisicing eu adipisicing consectetur et laborum.", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test4", description: "Cupidatat id reprehenderit minim amet duis labore anim eiusmod do consectetur dolor. Adipisicing tempor aliquip dolor magna nostrud commodo sunt culpa velit ut. Occaecat velit laborum velit exercitation aliquip voluptate duis sint enim nisi enim quis. Exercitation culpa exercitation dolor labore ea aliquip cupidatat ad mollit consequat commodo nostrud commodo. Non officia culpa aliqua quis magna mollit.", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test5", description: "Qui commodo et qui elit aliquip fugiat. Ea ea incididunt magna do. Ut esse sit duis officia cillum exercitation cillum labore enim fugiat aute Lorem nostrud proident. Adipisicing incididunt exercitation enim consectetur nulla id consequat culpa est tempor aute nostrud.", date: "2019-06-06 15:15:15"},
      ],
      "2019-02": [
        {id: 24, title: "Test1", description: "Test1", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test2", description: "Test2", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test3", description: "Test3", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test4", description: "Test4", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test5", description: "Test5", date: "2019-06-06 15:15:15"},
      ],
      "2019-01": [
        {id: 24, title: "Test1", description: "Test1", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test2", description: "Test2", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test3", description: "Test3", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test4", description: "Test4", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test5", description: "Test5", date: "2019-06-06 15:15:15"},
      ],
      "2018-11": [
        {id: 24, title: "Test1", description: "Test1", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test2", description: "Test2", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test3", description: "Test3", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test4", description: "Test4", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test5", description: "Test5", date: "2019-06-06 15:15:15"},
      ],
      "2018-10": [
        {id: 24, title: "Test1", description: "Test1", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test2", description: "Test2", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test3", description: "Test3", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test4", description: "Test4", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test5", description: "Test5", date: "2019-06-06 15:15:15"},
      ]
    }).pipe(delay(400))
  }

  constructor() { }
}

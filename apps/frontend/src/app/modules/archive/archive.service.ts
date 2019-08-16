import { Injectable } from '@angular/core';
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  getArchives () {
    return of({
      "2019-03": [
        {id: 24, title: "Test1", description: "Test1", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test2", description: "Test2", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test3", description: "Test3", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test4", description: "Test4", date: "2019-06-06 15:15:15"},
        {id: 24, title: "Test5", description: "Test5", date: "2019-06-06 15:15:15"},
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
    })
  }

  constructor() { }
}

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  getArchives () {
    return this.http.get(environment.baseURL + '/posts/getCountByMonth')
  }

  getDetailedArchives ({year, month}: {year: number, month: number}) {
    return this.http.get(environment.baseURL + '/posts/getPostsByYearMonth', {
      params: {
        year: year.toString(10),
        month: month.toString(10)
      }
    })
  }

  constructor(private http: HttpClient) { }
}

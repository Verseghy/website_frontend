import { Injectable } from '@angular/core'
import * as colorParser from 'parse-color'

@Injectable({
  providedIn: 'root',
})
export class ContrastService {
  constructor() {}

  static getConstrast(color: string): boolean {
    const rgb = colorParser(color).rgb
    const o = Math.round((parseInt(rgb[0], 10) * 299 + parseInt(rgb[1], 10) * 587 + parseInt(rgb[2], 10) * 114) / 1000)
    return o <= 125
  }
}

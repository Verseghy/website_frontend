import { Injectable } from '@angular/core';
import * as colorParser from 'parse-color';

@Injectable({
  providedIn: 'root'
})
export class ContrastService {

  constructor() { }

  getConstrast(color: string): boolean {
    let rgb = colorParser(color).rgb;
    let o = Math.round(((parseInt(rgb[0]) * 299) +
      (parseInt(rgb[1]) * 587) +
      (parseInt(rgb[2]) * 114)) / 1000);
    return (o > 125) ? false : true;
  }
}

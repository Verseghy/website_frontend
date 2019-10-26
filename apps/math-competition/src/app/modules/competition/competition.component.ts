import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  remainingTime = '00:00:00'
  loaded = false
  TEMPdescription = 'Mennyi a következő összeg pontos értéke? $\\left( ctg \\left ( \\frac{\\pi}{4} + \\pi \\right) + tg \\left ( \\frac{\\pi}{4} + \\pi \\right ) )^2 + (ctg \\left ( \\frac{\\pi}{4} + 2\\pi \\right) + tg \\left ( \\frac{\\pi}{4} +2 \\pi \\right ) )^2 + … + (ctg \\left ( \\frac{\\pi}{4} +188 \\pi \\right) + tg \\left ( \\frac{\\pi}{4} + 188 \\pi \\right ) \\right)^2$'
  TEMParr = []

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.TEMParr = Array(189)
      setTimeout(() => {(window as any).MathJax.typesetPromise().then(() => {
        this.loaded = true
      })})
    }, 1500)
  }

}

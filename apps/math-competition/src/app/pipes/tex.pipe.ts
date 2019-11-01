import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tex'
})
export class TexPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    setTimeout(() => (window as any).MathJax.typesetPromise(['.tex']))
    return value;
  }

}

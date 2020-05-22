import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if (!args || args.length === 0) {
      return value;
    }

    for (let i = 0; i < args.length; i++) {
      const s: string = args[i];

      if (!s || s.trim() === '') {
        continue;
      }
      const re = new RegExp(s, 'gi'); // 'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
      if (re.test(value)) {
        return '<span class="highlight h-' + (i + 1) + '">' + value + '</span>';
      }
    }
    return value;
  }
}

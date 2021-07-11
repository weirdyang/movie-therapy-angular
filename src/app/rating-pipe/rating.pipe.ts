import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case 'Internet Movie Database':
        return 'IMDB'
      case 'Rotten Tomatoes':
        return 'RT'
      default:
        return value;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, interval, merge } from 'rxjs';
import { debounce, map, share, shareReplay, tap } from 'rxjs/operators';
import { ShowService } from '../services/show.service';
import { Show } from '../types/show';
import { listAnimation } from './list-animation';

@Component({
  selector: 'app-card-shell',
  templateUrl: './card-shell.component.html',
  styleUrls: ['./card-shell.component.scss'],
  animations: [listAnimation]
})
export class CardShellComponent implements OnInit {

  private filterSubject = new BehaviorSubject<string>("series");
  filter$ = this.filterSubject.asObservable()
    .pipe(
      debounce(_ => interval(1500)),
      shareReplay(1)
    );

  setFilter(filterString: string) {
    this.filterSubject.next(filterString);
  }
  constructor(private showService: ShowService) { }

  movies$ = this.showService.getMovies().pipe(shareReplay(1));

  shows$ = this.showService.getTvShows().pipe(shareReplay(1));
  shuffleArray(array: Show[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  allShows = combineLatest([this.movies$, this.shows$, this.filter$])
    .pipe(
      map(([movies, shows, filter]) => {
        if (filter === 'all') {
          return this.shuffleArray([...movies, ...shows]);
        };
        if (filter === 'series') {
          return this.shuffleArray([...shows]);
        };
        return this.shuffleArray([...movies]);

      })
    );
  ngOnInit(): void {
  }

}

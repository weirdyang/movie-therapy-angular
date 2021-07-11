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
export class CardShellComponent {

  private filterSubject = new BehaviorSubject<string>("all");
  filter$ = this.filterSubject.asObservable()
    .pipe(
      debounce(_ => interval(500)),
      shareReplay(1)
    );

  setFilter(filterString: string) {
    this.filterSubject.next(filterString);
  }

  private searchSubject = new BehaviorSubject<string>("");
  search$ = this.searchSubject.asObservable()
    .pipe(
      debounce(_ => interval(1000)),
      shareReplay(1)
    );

  private _genre = "";
  get genre() {
    return this._genre;
  }
  set genre(value) {
    this._genre = value;
  }
  updateSearch(input: string) {
    this.genre = input;
    this.searchSubject.next(this.genre);
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
  allShows = combineLatest([this.movies$, this.shows$, this.filter$, this.search$])
    .pipe(
      map(([movies, shows, filter, search]) => {
        let consolidated: Show[] = [];
        if (filter === 'all') {
          consolidated = this.shuffleArray([...movies, ...shows]);
        };

        consolidated = filter === 'series'
          ? this.shuffleArray([...shows])
          : this.shuffleArray([...movies]);

        if (search.length !== 0) {
          return consolidated.filter(item =>
            item.data.Genre?.toLowerCase().includes(search.toLowerCase()));
        }
        return consolidated;
      })
    );


}

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, fromEvent, interval, merge, Observable, Subject } from 'rxjs';
import { debounce, debounceTime, map, share, shareReplay, take, takeUntil, tap } from 'rxjs/operators';
import { ShowService } from '../services/show.service';
import { Show } from '../types/show';
import { listStagger, listAnimation, showCard } from './list-animation';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NavigationService } from '../services/navigation.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-card-shell',
  templateUrl: './card-shell.component.html',
  styleUrls: ['./card-shell.component.scss'],
  animations: [listAnimation, showCard, listStagger]
})

export class CardShellComponent implements OnDestroy {
  @ViewChild(CdkVirtualScrollViewport, { static: false }) virtualScroll!: CdkVirtualScrollViewport;
  protected readonly destroy$ = new Subject();

  private _showMenu = false;

  get showMenu() {
    return this.navigationService.isShown;
  }

  set showMenu(value) {
    this.navigationService.setShowNav(value);
  }

  displayFilters() {
    this.showMenu = !this.showMenu;
  }
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
    this.genre = input.trim();

    this.searchSubject.next(this.genre);
  }
  constructor(private showService: ShowService,
    private navigationService: NavigationService,
    public breakpointObserver: BreakpointObserver) { }

  breakPoint$ = this.breakpointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.TabletPortrait,
    "(max-width: 768px)",
  ]).pipe(
    map(result => result.matches),
    takeUntil(this.destroy$),
    shareReplay(1),
  )

  hideMenu$ = this.breakPoint$.subscribe(result => {
    if (!result) {
      this.showMenu = false;
    }
  })
  movies$ = this.showService.getMovies().pipe(shareReplay(1));

  shows$ = this.showService.getTvShows().pipe(shareReplay(1));

  // https://github.com/angular/components/issues/10114
  chunkArray(array: Show[], chunk: number): Show[][] {
    const tempArray: Show[][] = [];
    for (let i = 0, j = array.length; i < j; i += chunk) {
      tempArray.push(array.slice(i, i + chunk));
    }
    return tempArray
  }

  shuffleArray(array: Show[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  scrollToTop() {
    let top = this.virtualScroll?.measureScrollOffset("start");
    console.log(top, 'top');
    this.virtualScroll?.scrollToOffset(top);
  }

  trackByFn(index: number, items: Show[]) {
    let titles = "";
    items.forEach(item => {
      titles += item.movieTitle.replace(/\s/g, "");
    });
    return `${titles}`;
  }

  checkViewportSize() {
    // window.dispatchEvent(new Event('resize'));
    setTimeout(() => {
      this.virtualScroll.checkViewportSize();
    }, 500);
  }

  allShows$ = combineLatest([this.movies$, this.shows$, this.filter$, this.search$])
    .pipe(
      map(([movies, shows, filter, search]) => {
        let consolidated: Show[] = [];
        if (filter === 'all') {
          consolidated = [...movies, ...shows]
        }
        else {
          consolidated = filter === 'series'
            ? [...shows]
            : [...movies]
        }

        if (search.length !== 0) {
          return consolidated.filter(item =>
            item.data.Genre?.toLowerCase().includes(search.toLowerCase()));
        }
        return consolidated.sort();
      }),
      map(consolidated => this.chunkArray(consolidated, 3)),
      shareReplay(1),
      share()
    );


  reSize$ = this.allShows$
    .pipe(
      debounceTime(10),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.scrollToTop();
      this.checkViewportSize();
    })


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

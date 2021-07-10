import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Show } from '../types/show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  private moviesUrl = 'https://raw.githubusercontent.com/weirdyang/movie-therapy/main/movies.json';
  private showsUrl = 'https://raw.githubusercontent.com/weirdyang/movie-therapy/main/tv-movies.json';
  constructor(private http: HttpClient) { }

  getMovies(): Observable<Show[]> {
    return this.http.get<Show[]>(this.moviesUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  getTvShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.showsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
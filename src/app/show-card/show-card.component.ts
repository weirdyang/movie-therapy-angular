import { Component, Input, OnInit } from '@angular/core';
import { Rating, Show } from '../types/show';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss']
})
export class ShowCardComponent implements OnInit {
  @Input()
  show!: Show

  defaultImg = "/assets/images/default-img.jpg"
  constructor() { }

  get hasRatings() {
    return this.show.ratings.length !== 0;
  }
  get imageSource() {
    return this.show.poster ? this.show.poster : this.defaultImg;
  }

  get hasImdbPage() {
    return this.show.imdbId !== null;
  }

  get imdbUrl() {
    return `https://www.imdb.com/title/${this.show.imdbId}/`;
  }
  ngOnInit(): void {
  }

}

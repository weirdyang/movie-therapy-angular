import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { share, shareReplay } from 'rxjs/operators';;
import { genres } from '../core/genres';

class Option {
  value!: string
  selected!: boolean;

  constructor(value: string, selected: boolean) {
    this.value = value;
    this.selected = selected;
  }
}

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss']
})
export class GenreFilterComponent {

  constructor() { }

  private _isOpenSubject = new BehaviorSubject<boolean>(true);

  isOpen$ = this._isOpenSubject.asObservable()
    .pipe(
      shareReplay(1),
      share()
    )

  @Input()
  options: Option[] = genres.map(item => new Option(item, false));

  @Input()
  placeholder: string = "Filter by genre";

  @Input()
  height: string = "25vh";

  @Output()
  selectedOptionsChanged = new EventEmitter<string[]>();

  get selectedOptions() {
    return this.options.filter(item => item.selected);
  }
  downIcon = faAngleDown;
  toggleOpen() {
    this._isOpenSubject.next(!this._isOpenSubject.value);
  }
  toggleSelect(option: Option) {
    option.selected = !option.selected;
    this.selectedOptionsChanged
      .emit(
        this.selectedOptions
          .map(item => item.value));
  }
}

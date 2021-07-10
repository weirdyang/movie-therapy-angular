import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShellComponent } from './card-shell.component';

describe('CardShellComponent', () => {
  let component: CardShellComponent;
  let fixture: ComponentFixture<CardShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="store.cities$ | async"
      (addNewItem)="onAddOne()"
      (delete)="onDelete($event)">
      <img src="assets/img/city.png" width="200px" />
    </app-card>
  `,
  styles: `
    :host {
      --background-color: rgba(0, 0, 255, 0.1);
    }
  `,
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class CityCardComponent implements OnInit {
  constructor(
    private http: FakeHttpService,
    public store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => {
      this.store.addAll(t);
    });
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAddOne() {
    this.store.addOne(randomCity());
  }
}

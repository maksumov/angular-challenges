import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemRefDirective } from '../../ui/list-item/list-item-ref.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (addNewItem)="onAddOne()">
      <img
        src="assets/img/city.png"
        width="200px"
        height="200px"
        alt="illustration of a city" />
      <ng-template listItemRef let-item>
        <app-list-item [id]="item.id" (delete)="onDelete($event)">
          {{ item.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: `
    app-card {
      background-color: rgba(0, 0, 255, 0.1);
    }
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  cities = computed(() => this.store.cities());

  private http = inject(FakeHttpService);
  public store = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => {
      this.store.addAll(cities);
    });
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAddOne() {
    this.store.addOne(randomCity());
  }
}

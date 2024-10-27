import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemRefDirective } from '../../ui/list-item/list-item-ref.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" (addNewItem)="onAddOne()">
      <img
        src="assets/img/student.webp"
        width="200px"
        height="200px"
        alt="illustration of students" />
      <ng-template listItemRef let-item>
        <app-list-item [id]="item.id" (delete)="onDelete($event)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      app-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  public students = computed(() => this.store.students());
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => {
      this.store.addAll(s);
    });
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAddOne() {
    this.store.addOne(randStudent());
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemRefDirective } from '../../ui/list-item/list-item-ref.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (addNewItem)="onAddOne()">
      <img
        src="assets/img/teacher.png"
        width="200px"
        height="200px"
        alt="illustration of a teacher" />
      <ng-template listItemRef let-item>
        <app-list-item [id]="item.id" (delete)="onDelete($event)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  public teachers = computed(() => this.store.teachers());

  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((teachers) => {
      this.store.addAll(teachers);
    });
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAddOne() {
    this.store.addOne(randTeacher());
  }
}

import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="persons$ | async"
      (addNewItem)="onAddOne()"
      (delete)="onDelete($event)">
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>
  `,
  styles: [
    `
      :host {
        --background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class TeacherCardComponent implements OnInit {
  public persons$ = this.store.teachers$.pipe(
    map((teachers) =>
      teachers.map(({ id, firstName }) => ({ id, name: firstName })),
    ),
  );

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAddOne() {
    this.store.addOne(randTeacher());
  }
}

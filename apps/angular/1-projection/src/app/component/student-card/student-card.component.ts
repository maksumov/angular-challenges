import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="persons$ | async"
      (delete)="onDelete($event)"
      (addNewItem)="onAddOne()">
      <img src="assets/img/student.webp" width="200px" />
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      :host {
        --background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  public persons$ = this.store.students$.pipe(
    map((students) =>
      students.map(({ id, firstName }) => ({ id, name: firstName })),
    ),
  );

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

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

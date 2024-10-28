import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Todo } from '../models/todo.interface';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  template: `
    {{ todo().title }}
    <button (click)="update.emit(todo())">Update</button>
  `,
  styles: `
    :host {
      display: flex;
      margin: 10px;
      gap: 10px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todo = input.required<Todo>();

  update = output<Todo>();
}

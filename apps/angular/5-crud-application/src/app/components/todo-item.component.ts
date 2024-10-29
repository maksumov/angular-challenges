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
    <input
      type="checkbox"
      [value]="todo().completed"
      [attr.id]="'checkbox-' + todo().id"
      (change)="statusToggle.emit(todo())" />
    <label
      for="{{ 'checkbox-' + todo().id }}"
      class="description"
      [class.text-strike]="todo().completed">
      {{ todo().title }}
    </label>
    <div class="buttons">
      <button (click)="update.emit(todo())">Update</button>
      <button (click)="delete.emit(todo().id)">Delete</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin: 8px;
      gap: 8px;
      border: 1px solid black;
      border-radius: 5px;
      padding: 4px;
      max-width: 600px;
    }

    .description {
      flex: 1;

      .text-strike {
        text-decoration: line-through;
      }
    }

    .buttons {
      display: flex;
      gap: 8px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todo = input.required<Todo>();

  update = output<Todo>();
  delete = output<Todo['id']>();
  statusToggle = output<Todo>();
}

import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { TodoComponent } from './components/todo-item.component';
import { Todo } from './models/todo.interface';
import { TodosService } from './services/todos.service';

@Component({
  standalone: true,
  imports: [CommonModule, TodoComponent],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <app-todo-item
        [todo]="todo"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
        (statusToggle)="onStatusToggle($event)"></app-todo-item>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private todosService = inject(TodosService);
  public todos = computed(() => this.todosService.todos());

  ngOnInit(): void {
    this.todosService.loadTodos();
  }

  onUpdate(todo: Todo) {
    this.todosService.update(todo);
  }

  onDelete(id: Todo['id']) {
    this.todosService.delete(id);
  }

  onStatusToggle(todo: Todo) {
    this.todosService.statusToggle(todo);
  }
}

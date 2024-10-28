import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Todo } from './models/todo.interface';
import { TodosService } from './services/todos.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </div>
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

  update(todo: Todo) {
    this.todosService.update(todo);
  }
}

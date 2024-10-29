import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../models/todo.interface';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
const JSON_HEADERS = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private http = inject(HttpClient);
  public todos = signal<Todo[]>([]);

  loadTodos() {
    this.http.get<Todo[]>(BASE_URL).subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: Todo) {
    this.http
      .put<Todo>(
        `${BASE_URL}/${todo.id}`,
        JSON.stringify({
          id: todo.id,
          title: randText(),
          completed: todo.completed,
          userId: todo.userId,
        }),
        JSON_HEADERS,
      )
      .subscribe((todoUpdated: Todo) => {
        this.todos.update((todos) =>
          todos.map((todoItem) =>
            todoItem.id === todoUpdated.id ? todoUpdated : todoItem,
          ),
        );
      });
  }

  delete(id: Todo['id']) {
    this.http.delete(`${BASE_URL}/${id}`).subscribe(() => {
      this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    });
  }

  statusToggle(todo: Todo) {
    this.http
      .patch<Todo>(
        `${BASE_URL}/${todo.id}`,
        JSON.stringify({ completed: !todo.completed }),
        JSON_HEADERS,
      )
      .subscribe((patchedTodo) => {
        this.todos.update((todos) =>
          todos.map((todo) =>
            todo.id === patchedTodo.id ? patchedTodo : todo,
          ),
        );
      });
  }
}

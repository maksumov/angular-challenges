import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './models/todo.interface';

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
  todos = signal<Todo[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos.set(todos);
      });
  }

  update(todo: any) {
    this.http
      .put<any>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: any) => {
        this.todos.update((todos) =>
          todos.map((todoItem) =>
            todoItem.id === todoUpdated.id ? todoUpdated : todoItem,
          ),
        );
      });
  }
}

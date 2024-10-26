import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="custom-bg-color flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="img" />
      <section>
        @for (item of list; track item.id) {
          <app-list-item
            [name]="item.name"
            [id]="item.id"
            (delete)="delete.emit($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  styles: `
    .custom-bg-color {
      background-color: var(--background-color);
    }
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;

  @Output() addNewItem = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();
}

import { Component, OnInit } from '@angular/core';
import {
  state,
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
  animations: [
    trigger('filterExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),

      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('400ms', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class FilterButtonComponent {
  openFilter = false;
}

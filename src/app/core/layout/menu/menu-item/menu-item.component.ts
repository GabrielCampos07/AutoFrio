import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Module } from 'src/app/core/layout/menu/shared/module';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() level: number = 0;
  @Input() module: Module = {
    route: '',
    description: '',
    icon: '',
  };

  @Output() menuItemClick = new EventEmitter();

  ngOnit(): void {}

  menuClick(route: string) {
    if (route) this.menuItemClick.emit(route);
  }
}

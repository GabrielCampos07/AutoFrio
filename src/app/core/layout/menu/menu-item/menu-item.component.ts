import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Module } from 'src/app/shared/models/module';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() level: number = 0;
  @Input() module: Module = {
    rota: '',
    descricao: '',
    icone: '',
  };

  @Output() menuItemClick = new EventEmitter();

  ngOnit(): void {}

  menuClick(route: string) {
    if (route) this.menuItemClick.emit(route);
  }
}

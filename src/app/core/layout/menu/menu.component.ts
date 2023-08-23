import { Component, EventEmitter, Output } from '@angular/core';
import { Module } from 'src/app/shared/models/module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() itemClick = new EventEmitter();

  public modulos: Module[] = [
    {
      rota: 'dashboard',
      descricao: 'Dashboard',
      icone: 'dashboard',
    },
    {
      rota: 'costumers',
      descricao: 'Costumers',
      icone: 'person_search',
    },
  ];
}

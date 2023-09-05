import { Component, EventEmitter, Output } from '@angular/core';
import { Module } from 'src/app/core/layout/menu/shared/module';
import { ModulesService } from 'src/app/core/layout/menu/shared/modules.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() itemClick = new EventEmitter();

  public modules: Module[] = [
    {
      route: 'dashboard',
      description: 'Dashboard',
      icon: 'dashboard',
    },
    {
      route: 'costumers',
      description: 'Costumers',
      icon: 'person_search',
    },
    {
      route: 'parts',
      description: 'Parts',
      icon: 'build',
    },
    {
      route: 'cars',
      description: 'Cars',
      icon: 'directions_car',
    },
    {
      route: 'services',
      description: 'Services',
      icon: 'assignment',
    },
  ];

  constructor(private modulesService: ModulesService) {}

  ngOnInit() {
    // this.modulesService
    //   .getModules()
    //   .subscribe((modules: Module[]) => (this.modules = modules));
  }
}

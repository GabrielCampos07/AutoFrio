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

  public modules: Module[] = [];

  constructor(private modulesService: ModulesService) {}

  ngOnInit() {
    this.modulesService
      .getModules()
      .subscribe((modules: Module[]) => (this.modules = modules));
  }
}

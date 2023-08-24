import { Component, EventEmitter, Output } from '@angular/core';
import { Module } from 'src/app/shared/models/module';
import { ModulesService } from 'src/app/shared/services/modules.service';

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

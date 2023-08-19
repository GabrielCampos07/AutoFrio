import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageComponent } from './page/page.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PageComponent, HeaderComponent, MenuComponent],
})
export class LayoutModule {}

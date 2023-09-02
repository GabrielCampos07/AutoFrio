import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageComponent } from './page/page.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';

@NgModule({
  imports: [RouterModule, SharedModule],
  declarations: [PageComponent, HeaderComponent, MenuComponent, MenuItemComponent],
})
export class LayoutModule {}

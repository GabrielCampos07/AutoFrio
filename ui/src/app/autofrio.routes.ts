import { LayoutModule } from './core/layout/layout.module';
import { PageComponent } from './core/layout/page/page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'costumers',
        loadChildren: () =>
          import('./administrative/costumers/costumers.module').then(
            (m) => m.CostumersModule
          ),
      },
      {
        path: 'parts',
        loadChildren: () =>
          import('./administrative/parts/parts.module').then(
            (m) => m.PartsModule
          ),
      },
      {
        path: 'cars',
        loadChildren: () =>
          import('./administrative/cars/cars.module').then((m) => m.CarsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LayoutModule],
})
export class AutoFrioRoutingModule {}

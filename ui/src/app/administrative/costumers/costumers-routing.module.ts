import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostumersComponent } from './costumers.component';

const routes: Routes = [{ path: '', component: CostumersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostumersRoutingModule {}

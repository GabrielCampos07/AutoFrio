import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorModule } from './interceptor/interceptor.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  exports: [InterceptorModule, HttpClientModule],
  declarations: [],
  providers: [HttpClientModule],
})
export class CoreModule {}

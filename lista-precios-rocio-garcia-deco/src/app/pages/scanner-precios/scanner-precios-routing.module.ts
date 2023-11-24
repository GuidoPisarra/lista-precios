import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannerPreciosPage } from './scanner-precios.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerPreciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerPreciosPageRoutingModule {}

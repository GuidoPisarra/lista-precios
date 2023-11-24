import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPreciosPageRoutingModule } from './scanner-precios-routing.module';

import { ScannerPreciosPage } from './scanner-precios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPreciosPageRoutingModule
  ],
  declarations: [ScannerPreciosPage]
})
export class ScannerPreciosPageModule { }

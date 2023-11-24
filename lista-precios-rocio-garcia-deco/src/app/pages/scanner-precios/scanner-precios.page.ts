import { Component, OnInit } from '@angular/core';

import { BarcodeScanner, CameraDirection, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { RestService } from 'src/app/service/rest.service';
import config from './../../../../capacitor.config';
@Component({
  selector: 'app-scanner-precios',
  templateUrl: './scanner-precios.page.html',
  styleUrls: ['./scanner-precios.page.scss'],
})
export class ScannerPreciosPage implements OnInit {
  scanActive: any;
  result: any;
  ventaCorrecta: any;

  constructor(
    private rest: RestService
  ) { }
  ngOnInit() {
  }
  async ionViewDidEnter() {
    BarcodeScanner.prepare();
    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();
    const background = document.getElementById('content');

    await BarcodeScanner.startScan(
      {
        targetedFormats: [SupportedFormat.QR_CODE, SupportedFormat.CODE_128],
        cameraDirection: CameraDirection.FRONT
      }).then((result) => {
        if (result.format === 'QR_CODE') {
          //TODO mejorar esto
          if (result.hasContent) {
            let product = this.rest.getOneProduct(result.content);
            product.subscribe(async item => {

              console.log(item);

            });
            background?.classList.add('fondoResultado');


          } else {
            alert('Sin resultados');
          }
        } else {
          if (result.hasContent) {
            let product = this.rest.getOneProduct(result.content);
            product.subscribe(async item => {

            });
            background?.classList.add('fondoResultado');

          } else {
            alert('Sin resultados');
          }

        }
      }).catch(err => {
        console.log(err.message);
      });
    // BarcodeScanner.showBackground();
  }

}

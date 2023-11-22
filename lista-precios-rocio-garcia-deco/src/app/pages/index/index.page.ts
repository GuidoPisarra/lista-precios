import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage {

  constructor(
    private rest: RestService
  ) { }

  async ionViewDidEnter() {
    BarcodeScanner.prepare();
    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();
    const background = document.getElementById('content');

    await BarcodeScanner.startScan(
      {
        targetedFormats:
          [SupportedFormat.QR_CODE,
          SupportedFormat.CODE_128
          ]
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
        alert(err);
      });
    BarcodeScanner.showBackground();
  }

}



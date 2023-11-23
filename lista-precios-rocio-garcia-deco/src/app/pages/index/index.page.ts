/* import { Component, OnInit } from '@angular/core';
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
          ],
        cameraDirection: 'back'
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
 */
import { Component, OnInit } from '@angular/core';
declare var Quagga: any; // Utilizando 'any' como tipo para QuaggaJS
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  showCamera: boolean = false;

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.startQuagga();
  }

  startQuagga() {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#camera-preview'), // Elemento HTML para mostrar la vista de la cámara
        constraints: {
          width: 480,
          height: 320,
          facingMode: 'environment' // Use la cámara trasera
        },
      },
      decoder: {
        readers: ['ean_reader', 'qr_reader'] // Tipos de códigos que Quagga buscará
      },
    }, (err: any) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
      Quagga.onDetected(this.onDetected); // Función para manejar los resultados del escaneo
    });
  }

  onDetected = (result: any) => {
    // Procesar el resultado del escaneo, por ejemplo:
    if (result.codeResult) {
      const scannedCode = result.codeResult.code;
      let product = this.rest.getOneProduct(scannedCode);
      product.subscribe(async item => {
        console.log(item);
        // Realizar acciones con los datos obtenidos del código escaneado
      });
    }
  }
  startScanning() {
    this.showCamera = true;
    this.startQuagga();
  }
}

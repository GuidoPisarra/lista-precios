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
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage {
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement> | undefined;

  constructor() { }
  showCamera: boolean = false;
  async startScanning() {
    this.showCamera = true;
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'environment' // Acceder a la cámara trasera
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (this.video && this.video.nativeElement) {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }
}

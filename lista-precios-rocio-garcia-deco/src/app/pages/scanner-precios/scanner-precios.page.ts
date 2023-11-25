import { Component, OnInit } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-scanner-precios',
  templateUrl: './scanner-precios.page.html',
  styleUrls: ['./scanner-precios.page.scss'],
})
export class ScannerPreciosPage implements OnInit {
  scanActive: boolean = true;
  result: string = '';
  precio: string = '';
  codigoAnterior: string = '';
  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
    this.initScanner();
  }

  async initScanner() {
    const codeReader = new BrowserMultiFormatReader();
    const video = document.createElement('video');
    document.body.appendChild(video);
    video.style.marginTop = '135px';
    video.style.minHeight = '82%';
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'environment' // Acceder a la cámara trasera
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      video.play();

      if (video instanceof HTMLVideoElement) {
        codeReader.decodeFromVideoElementContinuously(video, (result: any) => {
          if (result !== null && result !== '') {
            this.buscarPrecio(result);
          }
        });
      } else {
        console.error('El elemento video no es un HTMLVideoElement válido');
      }

    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  buscarPrecio(codigo: string) {
    if (codigo !== this.codigoAnterior) {
      this.codigoAnterior = codigo;
      const sucursal: Observable<any> = this.rest.getOneProduct(codigo);
      sucursal.subscribe(response => {
        this.result = response['datos']['product'].description;
        this.precio = response['datos']['product'].salePrice;
      });
    }
  }
}

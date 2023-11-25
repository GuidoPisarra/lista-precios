import { Component, OnInit } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
  selector: 'app-scanner-precios',
  templateUrl: './scanner-precios.page.html',
  styleUrls: ['./scanner-precios.page.scss'],
})
export class ScannerPreciosPage implements OnInit {
  scanActive: boolean = true;
  result: string = '';
  constructor() { }

  ngOnInit() {
    this.initScanner();
  }

  async initScanner() {
    const codeReader = new BrowserMultiFormatReader();
    const video = document.createElement('video');
    document.body.appendChild(video);

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
        console.log(video);
      } else {
        console.error('El elemento video no es un HTMLVideoElement válido');
      }

    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }
}

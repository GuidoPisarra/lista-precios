import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
  selector: 'app-scanner-precios',
  templateUrl: './scanner-precios.page.html',
  styleUrls: ['./scanner-precios.page.scss'],
})
export class ScannerPreciosPage implements OnInit {
  scanActive: boolean = true;
  result: string = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.initScanner();
  }

  async initScanner() {
    let isScanning = true; // Bandera para controlar el escaneo

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
        codeReader.decodeFromVideoElementContinuously(video, (result: any) => {
          if (isScanning) {
            // Realiza acciones con el resultado del escaneo
            console.log(result);

            // Detener el escaneo y apagar la cámara
            isScanning = false;


            // Redirigir a otra página
            // this.router.navigate(['/otra-pagina']); // Reemplaza '/otra-pagina' por la ruta a la que deseas redirigir
          }
        });
      } else {
        console.error('El elemento video no es un HTMLVideoElement válido');
      }

    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }
}

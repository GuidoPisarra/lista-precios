import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { RestService } from 'src/app/service/rest.service';
declare var Quagga: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage {
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement> | undefined;
  resultado: string = 'a';
  constructor() { }
  ionViewDidEnter() {
    this.startScanning();
  }

  async startScanning() {
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

        // Lógica de QuaggaJS para escanear códigos
        Quagga.init({
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: this.video.nativeElement,
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
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  onDetected = (result: any) => {
    // Procesar el resultado del escaneo aquí
    alert(result)
    this.resultado = result;
    console.log('Resultado del escaneo:', result);
  }
}

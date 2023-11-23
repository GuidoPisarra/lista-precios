import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Instascan from 'instascan';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  @ViewChild('video', { static: true }) video: ElementRef;
  scanner: Instascan.Scanner;

  constructor(private rest: RestService) { }

  async ngOnInit() {
  const constraints: MediaStreamConstraints = {
    video: {
      facingMode: 'environment' // 'environment' suele ser la cámara trasera
    }
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.video.nativeElement.srcObject = stream;
    // Iniciar Instascan aquí con this.video.nativeElement
  } catch (err) {
    console.error('Error al acceder a la cámara:', err);
  }
}

  async startScan(camera: Instascan.CameraInfo) {
    this.scanner.start(camera);

    this.scanner.addListener('scan', async content => {
      if (content) {
        let product = this.rest.getOneProduct(content);
        product.subscribe(async item => {
          console.log(item);
        });
        // You might want to handle background class addition here
      } else {
        alert('Sin resultados');
      }
    });

    // Handle errors
    this.scanner.addListener('error', error => {
      console.error(error);
      alert(error);
    });
  }
}

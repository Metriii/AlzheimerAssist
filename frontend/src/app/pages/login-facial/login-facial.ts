import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Router } from '@angular/router';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-login-facial',
  imports: [CommonModule],
  templateUrl: './login-facial.html',
  styleUrl: './login-facial.css',
})
export class LoginFacial implements AfterViewInit {

  @ViewChild('video')
  video!: ElementRef<HTMLVideoElement>;

  carregando = true;

  sucesso = false;

  erro = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngAfterViewInit() {

    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');

    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    this.carregando = false;

    this.cdr.detectChanges();

    await this.iniciarCamera();
  }

  async iniciarCamera() {

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    this.video.nativeElement.srcObject = stream;
  }

  async loginFacial() {

    const rostoSalvo = localStorage.getItem('rostoPaciente');

    if (!rostoSalvo) {

      this.animacaoErro();

      return;
    }

    const descriptorSalvo = new Float32Array(
      JSON.parse(rostoSalvo)
    );

    const deteccaoAtual = await faceapi
      .detectSingleFace(
        this.video.nativeElement,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!deteccaoAtual) {

      this.animacaoErro();

      return;
    }

    const distancia = faceapi.euclideanDistance(
      descriptorSalvo,
      deteccaoAtual.descriptor
    );

    console.log('Distância:', distancia);

    if (distancia < 0.5) {

      this.sucesso = true;

      this.cdr.detectChanges();

      setTimeout(() => {

        this.router.navigate(['/home-paciente']);

      }, 900);

    } else {

      this.animacaoErro();
    }
  }

  animacaoErro() {

    this.erro = true;

    this.cdr.detectChanges();

    setTimeout(() => {

      this.erro = false;

      this.cdr.detectChanges();

    }, 450);
  }
}
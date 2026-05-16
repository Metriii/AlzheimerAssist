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
  selector: 'app-cadastro-facial',
  imports: [CommonModule],
  templateUrl: './cadastro-facial.html',
  styleUrl: './cadastro-facial.css',
})
export class CadastroFacial implements AfterViewInit {

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

    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: true
      });

    this.video.nativeElement.srcObject = stream;
  }

  async cadastrarRosto() {

    const deteccao = await faceapi
      .detectSingleFace(
        this.video.nativeElement,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!deteccao) {

      this.animacaoErro();

      return;
    }

    localStorage.setItem(
      'rostoPaciente',
      JSON.stringify(
        Array.from(deteccao.descriptor)
      )
    );

    this.sucesso = true;

    this.cdr.detectChanges();

    setTimeout(() => {

      this.router.navigate(['/login-facial']);

    }, 800);
  }

  animacaoErro() {

    this.erro = true;

    this.cdr.detectChanges();

    setTimeout(() => {

      this.erro = false;

      this.cdr.detectChanges();

    }, 1200);
  }
}
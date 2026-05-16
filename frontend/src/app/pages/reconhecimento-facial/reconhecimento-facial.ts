import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-reconhecimento-facial',
  imports: [CommonModule],
  templateUrl: './reconhecimento-facial.html',
  styleUrl: './reconhecimento-facial.css',
})
export class ReconhecimentoFacial implements AfterViewInit {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  carregando = true;
  constructor(private router: Router) {}

  async ngAfterViewInit() {

    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');

    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    this.carregando = false;

    await this.iniciarCamera();
  }

  async iniciarCamera() {

    const stream = await navigator.mediaDevices.getUserMedia({
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
      alert('Nenhum rosto encontrado.');
      return;
    }

    localStorage.setItem(
      'rostoPaciente',
      JSON.stringify(Array.from(deteccao.descriptor))
    );

    alert('Rosto cadastrado com sucesso!');
  }

  async loginFacial() {

    const rostoSalvo = localStorage.getItem('rostoPaciente');

    if (!rostoSalvo) {
      alert('Nenhum rosto cadastrado ainda.');
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
      alert('Nenhum rosto encontrado.');
      return;
    }

    const distancia = faceapi.euclideanDistance(
      descriptorSalvo,
      deteccaoAtual.descriptor
    );

    console.log('Distância:', distancia);

   if (distancia < 0.5) {

  alert('Login aprovado!');

  this.router.navigate(['/home-paciente']);

} else {

  alert('Rosto não reconhecido.');
}
  }
}
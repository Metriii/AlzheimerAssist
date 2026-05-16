import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {

  email = '';
  senha = '';

  mostrarLoginCuidador = false;
  mostrarFace = false;

  fotoCapturada = '';

  erroReconhecimento = false;

  camposInvalidos: string[] = [];

  streamCamera?: MediaStream;

  @ViewChild('video')
  videoRef!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private router: Router) {}

  entrarPaciente() {
    const usuarioSalvo =
      localStorage.getItem('usuarioCadastrado');

    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado.');
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.tipo !== 'paciente') {
      alert('Nenhum paciente cadastrado para login facial.');
      return;
    }

    if (!usuario.foto) {
      alert('Paciente não possui foto facial cadastrada.');
      return;
    }

    this.erroReconhecimento = false;
    this.mostrarFace = true;

    setTimeout(() => {
      this.iniciarCamera();
    }, 200);
  }

  async iniciarCamera() {
    this.streamCamera =
      await navigator.mediaDevices.getUserMedia({
        video: true
      });

    this.videoRef.nativeElement.srcObject =
      this.streamCamera;
  }

  capturarRosto() {
    const usuarioSalvo =
      localStorage.getItem('usuarioCadastrado');

    if (!usuarioSalvo) {
      alert('Nenhum paciente cadastrado.');
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.tipo !== 'paciente') {
      alert('Nenhum paciente cadastrado para login facial.');
      return;
    }

    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    this.fotoCapturada =
      canvas.toDataURL('image/png');

    const fotoCadastro = usuario.foto;

    if (!fotoCadastro) {
      alert('Paciente não possui foto facial cadastrada.');
      return;
    }

    const reconhecido = this.compararFotos(
      fotoCadastro,
      this.fotoCapturada
    );

    if (!reconhecido) {
      this.erroReconhecimento = true;

      setTimeout(() => {
        this.erroReconhecimento = false;
      }, 700);

      return;
    }

    this.pararCamera();

    this.router.navigate(['/home-paciente']);
  }

  compararFotos(
    fotoCadastro: string,
    fotoLogin: string
  ): boolean {
    const tamanhoCadastro = fotoCadastro.length;
    const tamanhoLogin = fotoLogin.length;

    const diferenca =
      Math.abs(tamanhoCadastro - tamanhoLogin);

    return diferenca < 5000;
  }

  loginCuidador() {
    this.camposInvalidos = [];

    if (!this.email) {
      this.camposInvalidos.push('email');
    }

    if (!this.senha) {
      this.camposInvalidos.push('senha');
    }

    if (this.camposInvalidos.length > 0) {
      return;
    }

    const usuarioSalvo =
      localStorage.getItem('usuarioCadastrado');

    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado.');
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.tipo !== 'cuidador') {
      alert('Este login é apenas para cuidador.');
      return;
    }

    if (
      usuario.email !== this.email ||
      usuario.senha !== this.senha
    ) {
      alert('Email ou senha incorretos.');
      return;
    }

    this.router.navigate(['/home-cuidador']);
  }

  fecharFace() {
    this.mostrarFace = false;
    this.fotoCapturada = '';
    this.erroReconhecimento = false;

    this.pararCamera();
  }

  pararCamera() {
    if (this.streamCamera) {
      this.streamCamera
        .getTracks()
        .forEach(track => track.stop());
    }
  }

  campoInvalido(campo: string): boolean {
    return this.camposInvalidos.includes(campo);
  }
}
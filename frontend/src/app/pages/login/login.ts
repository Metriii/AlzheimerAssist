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

  pacienteSelecionado: any = null;

  @ViewChild('video')
  videoRef!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private router: Router) {}

  buscarUsuarios(): any[] {
    return JSON.parse(
      localStorage.getItem('usuariosCadastrados') || '[]'
    );
  }

  entrarPaciente() {
    const usuarios = this.buscarUsuarios();

    const paciente = usuarios.find(
      usuario => usuario.tipo === 'paciente'
    );

    if (!paciente) {
      alert('Nenhum paciente cadastrado.');
      return;
    }

    if (!paciente.foto) {
      alert('Paciente não possui foto facial cadastrada.');
      return;
    }

    this.pacienteSelecionado = paciente;

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
    if (!this.pacienteSelecionado) {
      alert('Nenhum paciente selecionado.');
      return;
    }

    const usuario = this.pacienteSelecionado;

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

    localStorage.setItem(
      'usuarioLogado',
      JSON.stringify({
        id: usuario.id,
        tipo: usuario.tipo,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf
      })
    );

    this.pararCamera();

    this.router.navigate(['/home-paciente']);
  }

compararFotos(
  fotoCadastro: string,
  fotoLogin: string
): boolean {

  const tamanhoCadastro =
    fotoCadastro.length;

  const tamanhoLogin =
    fotoLogin.length;

  const diferenca =
    Math.abs(
      tamanhoCadastro - tamanhoLogin
    );

  return diferenca < 30000;

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

    const usuarios = this.buscarUsuarios();

    const cuidador = usuarios.find(
      usuario =>
        usuario.tipo === 'cuidador' &&
        usuario.email === this.email &&
        usuario.senha === this.senha
    );

    if (!cuidador) {
      alert('Email ou senha incorretos, ou cuidador não cadastrado.');
      return;
    }

    localStorage.setItem(
      'usuarioLogado',
      JSON.stringify({
        id: cuidador.id,
        tipo: cuidador.tipo,
        nome: cuidador.nome,
        email: cuidador.email,
        cpf: cuidador.cpf
      })
    );

    this.router.navigate(['/home-cuidador']);
  }

  fecharFace() {
    this.mostrarFace = false;
    this.fotoCapturada = '';
    this.erroReconhecimento = false;
    this.pacienteSelecionado = null;

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
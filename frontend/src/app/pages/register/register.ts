import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {

  tipo = '';
  nome = '';
  email = '';
  senha = '';
  cpf = '';

  fotoCapturada = '';
  mostrarFace = false;

  camposInvalidos: string[] = [];

  streamCamera?: MediaStream;

  @ViewChild('video')
  videoRef!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private router: Router) {}

  somenteNumero(event: KeyboardEvent) {
    const tecla = event.key;

    if (!/[0-9]/.test(tecla)) {
      event.preventDefault();
    }
  }

  formatarCPF(event: Event) {
    const input = event.target as HTMLInputElement;

    let valor = input.value.replace(/\D/g, '');

    valor = valor.substring(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    this.cpf = valor;
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
  }

  continuarCadastro() {
    this.camposInvalidos = [];

    if (!this.tipo) {
      this.camposInvalidos.push('tipo');
    }

    if (!this.nome) {
      this.camposInvalidos.push('nome');
    }

    if (!this.email) {
      this.camposInvalidos.push('email');
    }

    if (!this.senha) {
      this.camposInvalidos.push('senha');
    }

    if (
      !this.cpf ||
      this.cpf.length < 14
    ) {
      this.camposInvalidos.push('cpf');
    }

    if (this.camposInvalidos.length > 0) {
      return;
    }

    const usuarios = this.buscarUsuarios();

    const emailJaExiste = usuarios.some(
      usuario => usuario.email === this.email
    );

    const cpfJaExiste = usuarios.some(
      usuario => usuario.cpf === this.cpf
    );

    if (emailJaExiste) {
      alert('Este email já está cadastrado.');
      return;
    }

    if (cpfJaExiste) {
      alert('Este CPF já está cadastrado.');
      return;
    }

    if (this.tipo === 'paciente') {
      this.mostrarFace = true;

      setTimeout(() => {
        this.iniciarCamera();
      }, 200);

      return;
    }

    if (this.tipo === 'cuidador') {
      this.cadastrar();
    }
  }

  cadastrar() {
    if (
      this.tipo === 'paciente' &&
      !this.fotoCapturada
    ) {
      alert('Capture uma foto facial antes de finalizar.');
      return;
    }

    const usuarios = this.buscarUsuarios();

    const usuario = {
      id: Date.now(),
      tipo: this.tipo,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      cpf: this.cpf,
      foto: this.fotoCapturada
    };

    usuarios.push(usuario);

    localStorage.setItem(
      'usuariosCadastrados',
      JSON.stringify(usuarios)
    );

    this.pararCamera();

    this.router.navigate(['/']);
  }

  buscarUsuarios(): any[] {
    return JSON.parse(
      localStorage.getItem('usuariosCadastrados') || '[]'
    );
  }

  pararCamera() {
    if (this.streamCamera) {
      this.streamCamera
        .getTracks()
        .forEach(track => {
          track.stop();
        });
    }
  }

  campoInvalido(campo: string): boolean {
    return this.camposInvalidos.includes(campo);
  }
}
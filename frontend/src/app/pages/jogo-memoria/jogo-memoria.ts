// jogo-memoria.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Carta {
  id: number;
  nome: string;
  imagem: string;
  virada: boolean;
  encontrada: boolean;
}

@Component({
  selector: 'app-jogo-memoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jogo-memoria.html',
  styleUrls: ['./jogo-memoria.css']
})
export class JogoMemoria implements OnInit {

  cartas: Carta[] = [];

  primeiraCarta: Carta | null = null;
  segundaCarta: Carta | null = null;

  bloqueado = false;

  mostrarTrofeu = false;

  constructor(private router: Router) {}

  objetos = [
    {
      nome: 'Abacaxi',
      imagem: 'https://img.icons8.com/color/96/pineapple.png'
    },
    {
      nome: 'Avião',
      imagem: 'https://img.icons8.com/color/96/airplane-take-off.png'
    },
    {
      nome: 'Bicicleta',
      imagem: 'https://img.icons8.com/color/96/bicycle.png'
    },
    {
      nome: 'Borboleta',
      imagem: 'https://img.icons8.com/color/96/butterfly.png'
    },
    {
      nome: 'Café',
      imagem: 'https://img.icons8.com/color/96/coffee-to-go.png'
    },
    {
      nome: 'Câmera',
      imagem: 'https://img.icons8.com/color/96/camera.png'
    },
    {
      nome: 'Coração',
      imagem: 'https://img.icons8.com/color/96/like--v1.png'
    },
    {
      nome: 'Estrela',
      imagem: 'https://img.icons8.com/color/96/star.png'
    },
    {
      nome: 'Foguete',
      imagem: 'https://img.icons8.com/color/96/rocket.png'
    },
    {
      nome: 'Lâmpada',
      imagem: 'https://img.icons8.com/color/96/light-on.png'
    },
    {
      nome: 'Sorvete',
      imagem: 'https://img.icons8.com/color/96/ice-cream-cone.png'
    },
    {
      nome: 'Tartaruga',
      imagem: 'https://img.icons8.com/color/96/turtle.png'
    }
  ];

  ngOnInit(): void {
    this.iniciarJogo();
  }

  iniciarJogo() {

    const pares = [...this.objetos, ...this.objetos];

    this.cartas = pares.map((objeto, index) => ({
      id: index,
      nome: objeto.nome,
      imagem: objeto.imagem,
      virada: false,
      encontrada: false
    }));

    this.embaralhar();
  }

  embaralhar() {
    this.cartas.sort(() => Math.random() - 0.5);
  }

  virarCarta(carta: Carta) {

    if (
      this.bloqueado ||
      carta.virada ||
      carta.encontrada
    ) {
      return;
    }

    carta.virada = true;

    if (!this.primeiraCarta) {
      this.primeiraCarta = carta;
      return;
    }

    this.segundaCarta = carta;

    this.verificarPar();
  }

  verificarPar() {

    if (!this.primeiraCarta || !this.segundaCarta) {
      return;
    }

    this.bloqueado = true;

    const acertou =
      this.primeiraCarta.nome === this.segundaCarta.nome;

    if (acertou) {

      this.primeiraCarta.encontrada = true;
      this.segundaCarta.encontrada = true;

      this.resetarJogada();

      if (this.cartas.every(c => c.encontrada)) {

        this.mostrarTrofeu = true;

        setTimeout(() => {

          this.router.navigate(['/atividade-memoria']);

        }, 3000);
      }

    } else {

      setTimeout(() => {

        if (this.primeiraCarta) {
          this.primeiraCarta.virada = false;
        }

        if (this.segundaCarta) {
          this.segundaCarta.virada = false;
        }

        this.resetarJogada();

      }, 1000);
    }
  }

  resetarJogada() {
    this.primeiraCarta = null;
    this.segundaCarta = null;
    this.bloqueado = false;
  }

  reiniciar() {
    this.resetarJogada();
    this.iniciarJogo();
  }
}
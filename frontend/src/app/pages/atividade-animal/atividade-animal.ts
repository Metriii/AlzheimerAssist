import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-atividade-animal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atividade-animal.html',
  styleUrl: './atividade-animal.css',
})
export class AtividadeAnimal {

  animais = [
    {
      nome: 'Cachorro',
      imagem: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop'
    },
    {
      nome: 'Gato',
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg'
    },
    {
      nome: 'Elefante',
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg'
    },
    {
      nome: 'Leão',
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg'
    },
    {
      nome: 'Macaco',
      imagem: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  indiceAtual = 0;

  opcoes: string[] = [];

  mensagem = '';

  acertou = false;

  errou = false;

  acertos = 0;
  mostrarTrofeu = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {

    this.gerarOpcoes();
  }

  // animal atual
  get animalAtual() {

    return this.animais[this.indiceAtual];
  }

  // gera os 4 botões
  gerarOpcoes() {

    const nomes = this.animais.map(
      animal => animal.nome
    );

    const nomesErrados = nomes.filter(
      nome => nome !== this.animalAtual.nome
    );

    nomesErrados.sort(
      () => Math.random() - 0.5
    );

    const opcoes = nomesErrados.slice(0, 3);

    opcoes.push(this.animalAtual.nome);

    this.opcoes = opcoes.sort(
      () => Math.random() - 0.5
    );
  }

  // verifica resposta
  verificarResposta(resposta: string) {

    // ACERTOU
    if (resposta === this.animalAtual.nome) {

      this.mensagem = 'Parabéns! Você acertou!';

      this.acertou = true;

      this.acertos++;

setTimeout(() => {

  this.acertou = false;

  // terminou a atividade
  if (this.acertos >= 10) {

    this.mostrarTrofeu = true;

    this.cdr.detectChanges();

    setTimeout(() => {

      this.router.navigate([
        '/atividade-memoria'
      ]);

    }, 3500);

    return;
  }

  this.proximoAnimal();

  this.cdr.detectChanges();

}, 500);

    }

    // ERROU
    else {

      this.mensagem = 'Tente novamente!';

      this.errou = true;

      setTimeout(() => {

        this.errou = false;

        this.mensagem = '';

        this.cdr.detectChanges();

      }, 500);
    }
  }

  // troca animal
  proximoAnimal() {

    let novoIndice = this.indiceAtual;

    while (
      novoIndice === this.indiceAtual
    ) {

      novoIndice = Math.floor(
        Math.random() * this.animais.length
      );
    }

    this.indiceAtual = novoIndice;

    this.gerarOpcoes();

    this.mensagem = '';
  }

}
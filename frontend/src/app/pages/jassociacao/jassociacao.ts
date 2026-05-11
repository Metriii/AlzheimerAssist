import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {

  nome: string;

  imagem: string;

  acertou?: boolean;
}

@Component({
  selector: 'app-jassociacao',
  imports: [CommonModule],
  templateUrl: './jassociacao.html',
  styleUrl: './jassociacao.css'
})
export class Jassociacao {

  nivel = 1;
  mostrarAnimacao = false;

itensNivel1: Item[] = [

  {
    nome: 'Cachorro',
    imagem: 'https://placedog.net/400'
  },

  {
    nome: 'Gato',
    imagem: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg'
  },

  {
    nome: 'Maçã',
    imagem: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=600'
  }
];

  itensNivel2: Item[] = [

    {
      nome: 'Carro',
      imagem: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600'
    },

    {
      nome: 'Banana',
      imagem: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600'
    },

    {
      nome: 'Pássaro',
      imagem: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=600'
    },

    {
      nome: 'Casa',
      imagem: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=600'
    },

    {
      nome: 'Flor',
      imagem: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600'
    }
  ];

  itens: Item[] = [];

  palavras: Item[] = [];

  itemArrastado!: Item;

  mensagem = '';

  mostrarMensagem = false;

  acertou = false;

  constructor() {

    this.carregarNivel();
  }

  carregarNivel() {

    if (this.nivel === 1) {

      this.itens = [...this.itensNivel1];
    }

    else {

      this.itens = [...this.itensNivel2];
    }

    this.palavras = [...this.itens]
      .sort(() => Math.random() - 0.5);
  }

  dragStart(item: Item) {

    this.itemArrastado = item;
  }

  permitirDrop(event: DragEvent) {

    event.preventDefault();
  }
drop(palavra: Item) {

  /* ACERTO */

  if (
    this.itemArrastado.nome === palavra.nome
  ) {

    palavra.acertou = true;

    this.itemArrastado.acertou = true;

    /* IMAGEM FICA NO CARD */

    palavra.imagem = this.itemArrastado.imagem;

    this.mensagem = 'Muito bem!';

    this.acertou = true;

    this.mostrarMensagem = true;

    setTimeout(() => {

      this.mostrarMensagem = false;

    }, 1200);

    this.verificarFim();
  }

  /* ERRO */

  else {

    this.mensagem = 'Ops! Tente novamente';

    this.acertou = false;

    this.mostrarMensagem = true;

    setTimeout(() => {

      this.mostrarMensagem = false;

    }, 1200);
  }
}

verificarFim() {

  const terminou = this.itens.every(
    item => item.acertou
  );

  if (!terminou) {
    return;
  }

  /* FASE 1 → FASE 2 */

  if (this.nivel === 1) {

    this.nivel = 2;

    this.carregarNivel();

    return;
  }

  /* FINAL */

  this.mostrarAnimacao = true;

  setTimeout(() => {

    window.location.href =
      '/atividade-memoria';

  }, 2500);
}
}
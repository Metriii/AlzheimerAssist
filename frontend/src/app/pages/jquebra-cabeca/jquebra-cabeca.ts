import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Peca {

  id: number;

  posicaoImagem: string;
}

@Component({
  selector: 'app-jquebra-cabeca',
  imports: [CommonModule],
  templateUrl: './jquebra-cabeca.html',
  styleUrl: './jquebra-cabeca.css'
})
export class JquebraCabeca implements OnInit {

  imagens = [

    'https://picsum.photos/id/10/540/540',

    'https://picsum.photos/id/1040/540/540'
  ];

  imagem = this.imagens[0];

  pecas: Peca[] = [];

  movimentos = 0;

  venceu = false;

  mostrarAnimacao = false;

  nivel = 1;

  indiceArrastado: number | null = null;

  tamanhoPeca = 180;

  ngOnInit(): void {

    this.criarPecas();
  }
criarPecas() {

  const novasPecas: Peca[] = [];

  for (let i = 0; i < 9; i++) {

    const coluna = i % 3;

    const linha = Math.floor(i / 3);

    novasPecas.push({

      id: i,

      posicaoImagem:
        `-${coluna * this.tamanhoPeca}px -${linha * this.tamanhoPeca}px`
    });
  }

  this.pecas = [...novasPecas];

  this.embaralhar();
}

  embaralhar() {

    this.venceu = false;

    this.movimentos = 0;

    for (let i = this.pecas.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [this.pecas[i], this.pecas[j]] =
      [this.pecas[j], this.pecas[i]];
    }
  }

  dragStart(index: number) {

    this.indiceArrastado = index;
  }

  permitirDrop(event: DragEvent) {

    event.preventDefault();
  }

  drop(indexDestino: number) {

    if (this.indiceArrastado === null) {
      return;
    }

    [this.pecas[this.indiceArrastado],
     this.pecas[indexDestino]] =

    [this.pecas[indexDestino],
     this.pecas[this.indiceArrastado]];

    this.movimentos++;

    this.verificarVitoria();

    this.indiceArrastado = null;
  }

verificarVitoria() {

  const venceu = this.pecas.every(
    (peca, index) => peca.id === index
  );

  this.venceu = venceu;

  if (venceu) {

    this.proximoNivel();
  }
}

proximoNivel() {

  /* NÍVEL 1 → NÍVEL 2 */

  if (this.nivel === 1) {

    this.nivel = 2;

    this.imagem = this.imagens[1];

    this.venceu = false;

    this.movimentos = 0;

    this.criarPecas();

    return;
  }

  /* TERMINOU O NÍVEL 2 */

  if (this.nivel === 2) {

    this.mostrarAnimacaoFinal();
  }
}

mostrarAnimacaoFinal() {

  this.mostrarAnimacao = true;

  setTimeout(() => {

    window.location.href = '/atividade-memoria';

  }, 2500);
}


  trocarNivel() {

    if (this.nivel === 1) {

      this.nivel = 2;

      this.imagem = this.imagens[1];

    } else {

      this.nivel = 1;

      this.imagem = this.imagens[0];
    }

    this.criarPecas();
  }
}
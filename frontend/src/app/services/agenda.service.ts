import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private storageKey = 'agenda';

  // 🔥 carregar lista
  load(): any[] {

    return JSON.parse(
      localStorage.getItem(
        this.storageKey
      ) || '[]'
    );

  }

  // 🔥 salvar lista
  private save(lista: any[]) {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(lista)
    );

    console.log(
      'SERVICE -> lista salva',
      lista
    );

  }

  // 🔥 adicionar
  salvar(
    titulo: string,
    horario: string
  ) {

    const atual = this.load();

    atual.push({
      titulo,
      horario,
      feito: false
    });

    this.save(atual);

  }

  // 🔥 excluir
  excluir(index: number) {

    const atual = this.load();

    atual.splice(index, 1);

    this.save(atual);

  }

  // 🔥 checkbox
  toggleFeito(index: number) {

    const atual = this.load();

    atual[index].feito =
      !atual[index].feito;

    this.save(atual);

  }

}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  salvar(titulo: string, horario: string) {

    const novaTarefa = {
      titulo,
      horario
    };

    let atual = JSON.parse(localStorage.getItem('agenda') || '[]');

    if (!Array.isArray(atual)) {
      atual = [];
    }

    atual.push(novaTarefa);

    localStorage.setItem('agenda', JSON.stringify(atual));

    console.log('SERVICE -> salvou:', atual);
  }

  excluir(index: number) {

    let atual = JSON.parse(localStorage.getItem('agenda') || '[]');

    if (!Array.isArray(atual)) {
      atual = [];
    }

    atual.splice(index, 1);

    localStorage.setItem('agenda', JSON.stringify(atual));

    console.log('SERVICE -> excluiu:', atual);
  }

}
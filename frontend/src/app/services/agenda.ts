import { Injectable } from '@angular/core';

export interface Tarefa {
  titulo: string;
  horario: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private tarefas: Tarefa[] = [];

  constructor() {
    console.log('🔥 SERVICE INICIADO');
  }

  adicionar(titulo: string, horario: string) {
    this.tarefas = [...this.tarefas, { titulo, horario }];
    console.log('📤 LISTA ATUAL:', this.tarefas);
  }

  listar(): Tarefa[] {
    return this.tarefas;
  }
}
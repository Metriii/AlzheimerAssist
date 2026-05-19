import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AgendaService {

  // 🔥 chave dinâmica por usuário
  private getStorageKey(): string {

    const usuarioLogado = JSON.parse(

      localStorage.getItem(
        'usuarioLogado'
      ) || 'null'

    );

    if (
      !usuarioLogado ||
      !usuarioLogado.email ||
      !usuarioLogado.cpf
    ) {

      return 'agenda_sem_usuario';

    }

    const emailLimpo =
      usuarioLogado.email
        .trim()
        .toLowerCase();

    const cpfLimpo =
      usuarioLogado.cpf
        .replace(/\D/g, '');

    return `
      agenda_
      ${emailLimpo}_
      ${cpfLimpo}
    `;

  }

  // 🔥 carregar lista
  load(): any[] {

    return JSON.parse(

      localStorage.getItem(
        this.getStorageKey()
      ) || '[]'

    );

  }

  // 🔥 salvar lista
  private save(lista: any[]) {

    localStorage.setItem(

      this.getStorageKey(),

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
  loadPorPaciente(email: string) {
  return JSON.parse(
    localStorage.getItem(`agenda-diaria-${email}`) || '[]'
  );
}

}
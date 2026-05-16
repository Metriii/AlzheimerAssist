import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { HomeMedicoComponent } from './pages/home-medico/home-medico';
import { HomeCuidador } from './pages/home-cuidador/home-cuidador';
import { HomePacienteComponent } from './pages/home-paciente/home-paciente';
import { VincularPaciente } from './pages/vincular-paciente/vincular-paciente';
import { AtividadeMemoria } from './pages/atividade-memoria/atividade-memoria';
import { AtividadeAnimal } from './pages/atividade-animal/atividade-animal';
import { JogoMemoria } from './pages/jogo-memoria/jogo-memoria';
import { JquebraCabeca } from './pages/jquebra-cabeca/jquebra-cabeca';
import { Jassociacao } from './pages/jassociacao/jassociacao';
import { AgendaAnual } from './pages/agenda-anual/agenda-anual';
import { PacienteAgenda } from './pages/paciente-agenda/paciente-agenda';
import { CuidadorAgenda } from './pages/cuidador-agenda/cuidador-agenda';
import { ReconhecimentoFacial } from './pages/reconhecimento-facial/reconhecimento-facial';
import { CadastroFacial } from './pages/cadastro-facial/cadastro-facial';
import { LoginFacial } from './pages/login-facial/login-facial';


export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent },

  { path: 'home-medico', component: HomeMedicoComponent },
  { path: 'home-cuidador', component: HomeCuidador },
  { path: 'vincular-paciente', component: VincularPaciente },
  { path: 'home-paciente', component: HomePacienteComponent },

  { path: 'atividade-memoria', component: AtividadeMemoria },
  { path: 'atividade-animal', component: AtividadeAnimal },
  { path: 'jogo-memoria', component: JogoMemoria },
  { path: 'quebra-cabeca', component: JquebraCabeca },
  { path: 'associacao', component: Jassociacao },

  { path: 'agenda-anual', component: AgendaAnual },
  { path: 'paciente-agenda', component: PacienteAgenda},
  { path: 'cuidador-agenda', component: CuidadorAgenda},
  { path: 'reconhecimento-facial', component: ReconhecimentoFacial},
  { path: 'cadastro-facial', component: CadastroFacial},
  { path: 'login-facial', component: LoginFacial},

];
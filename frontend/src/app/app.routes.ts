import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { HomeMedicoComponent } from './pages/home-medico/home-medico';
import { HomeCuidador } from './pages/home-cuidador/home-cuidador';
import { HomePacienteComponent } from './pages/home-paciente/home-paciente';
import { VincularPaciente } from './pages/vincular-paciente/vincular-paciente';
import { AtividadeMemoria} from './pages/atividade-memoria/atividade-memoria';
import { AtividadeAnimal } from './pages/atividade-animal/atividade-animal';
import { JogoMemoria } from './pages/jogo-memoria/jogo-memoria';
import { JquebraCabeca } from './pages/jquebra-cabeca/jquebra-cabeca';
import { Jassociacao } from './pages/jassociacao/jassociacao';

export const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent },

  // 👇 ADICIONA ISSO
  { path: 'home-medico', component: HomeMedicoComponent },
  { path:'home-cuidador', component : HomeCuidador},
  { path:'vincular-paciente', component : VincularPaciente},
  { path: 'home-paciente', component: HomePacienteComponent},
  {path: 'atividade-memoria', component: AtividadeMemoria},
  {path: 'atividade-animal',component: AtividadeAnimal},
  {path: 'jogo-memoria', component :JogoMemoria },
  {path: 'quebra-cabeca', component: JquebraCabeca},
  {path: 'associacao', component: Jassociacao},

];
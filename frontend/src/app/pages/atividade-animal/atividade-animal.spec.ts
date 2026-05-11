import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeAnimal } from './atividade-animal';

describe('AtividadeAnimal', () => {
  let component: AtividadeAnimal;
  let fixture: ComponentFixture<AtividadeAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtividadeAnimal],
    }).compileComponents();

    fixture = TestBed.createComponent(AtividadeAnimal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

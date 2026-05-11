import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeMemoria } from './atividade-memoria';

describe('AtividadeMemoria', () => {
  let component: AtividadeMemoria;
  let fixture: ComponentFixture<AtividadeMemoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtividadeMemoria],
    }).compileComponents();

    fixture = TestBed.createComponent(AtividadeMemoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

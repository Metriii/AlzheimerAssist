import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteAgenda } from './paciente-agenda';

describe('PacienteAgenda', () => {
  let component: PacienteAgenda;
  let fixture: ComponentFixture<PacienteAgenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteAgenda],
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteAgenda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

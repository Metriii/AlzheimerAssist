import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularPaciente } from './vincular-paciente';

describe('VincularPaciente', () => {
  let component: VincularPaciente;
  let fixture: ComponentFixture<VincularPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VincularPaciente],
    }).compileComponents();

    fixture = TestBed.createComponent(VincularPaciente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

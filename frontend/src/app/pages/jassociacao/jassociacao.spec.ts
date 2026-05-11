import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jassociacao } from './jassociacao';

describe('Jassociacao', () => {
  let component: Jassociacao;
  let fixture: ComponentFixture<Jassociacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jassociacao],
    }).compileComponents();

    fixture = TestBed.createComponent(Jassociacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

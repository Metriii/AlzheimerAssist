import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoMemoria } from './jogo-memoria';

describe('JogoMemoria', () => {
  let component: JogoMemoria;
  let fixture: ComponentFixture<JogoMemoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogoMemoria],
    }).compileComponents();

    fixture = TestBed.createComponent(JogoMemoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

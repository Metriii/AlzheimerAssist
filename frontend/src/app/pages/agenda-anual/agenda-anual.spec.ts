import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaAnual } from './agenda-anual';

describe('AgendaAnual', () => {
  let component: AgendaAnual;
  let fixture: ComponentFixture<AgendaAnual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaAnual],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaAnual);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

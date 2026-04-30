import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMedico } from './home-medico';

describe('HomeMedico', () => {
  let component: HomeMedico;
  let fixture: ComponentFixture<HomeMedico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMedico],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMedico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCuidador } from './home-cuidador';

describe('HomeCuidador', () => {
  let component: HomeCuidador;
  let fixture: ComponentFixture<HomeCuidador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCuidador],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCuidador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

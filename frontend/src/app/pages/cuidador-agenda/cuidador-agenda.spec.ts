import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadorAgenda } from './cuidador-agenda';

describe('CuidadorAgenda', () => {
  let component: CuidadorAgenda;
  let fixture: ComponentFixture<CuidadorAgenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuidadorAgenda],
    }).compileComponents();

    fixture = TestBed.createComponent(CuidadorAgenda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

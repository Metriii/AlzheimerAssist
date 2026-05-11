import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JquebraCabeca } from './jquebra-cabeca';

describe('JquebraCabeca', () => {
  let component: JquebraCabeca;
  let fixture: ComponentFixture<JquebraCabeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JquebraCabeca],
    }).compileComponents();

    fixture = TestBed.createComponent(JquebraCabeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

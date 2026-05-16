import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFacial } from './cadastro-facial';

describe('CadastroFacial', () => {
  let component: CadastroFacial;
  let fixture: ComponentFixture<CadastroFacial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroFacial],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroFacial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFacial } from './login-facial';

describe('LoginFacial', () => {
  let component: LoginFacial;
  let fixture: ComponentFixture<LoginFacial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFacial],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFacial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

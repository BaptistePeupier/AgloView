import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceurPasswordComponent } from './annonceur-password.component';

describe('AnnonceurPasswordComponent', () => {
  let component: AnnonceurPasswordComponent;
  let fixture: ComponentFixture<AnnonceurPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceurPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceurPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

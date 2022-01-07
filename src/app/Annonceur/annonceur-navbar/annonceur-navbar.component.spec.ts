import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceurNavbarComponent } from './annonceur-navbar.component';

describe('AnnonceurNavbarComponent', () => {
  let component: AnnonceurNavbarComponent;
  let fixture: ComponentFixture<AnnonceurNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceurNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceurNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

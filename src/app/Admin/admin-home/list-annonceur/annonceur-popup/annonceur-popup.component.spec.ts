import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceurPopupComponent } from './annonceur-popup.component';

describe('AnnonceurPopupComponent', () => {
  let component: AnnonceurPopupComponent;
  let fixture: ComponentFixture<AnnonceurPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceurPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceurPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceurHomeComponent } from './annonceur-home.component';

describe('AnnonceurHomeComponent', () => {
  let component: AnnonceurHomeComponent;
  let fixture: ComponentFixture<AnnonceurHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceurHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceurHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

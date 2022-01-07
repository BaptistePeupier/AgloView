import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceurStatistiqueComponent } from './annonceur-statistique.component';

describe('AnnonceurStatistiqueComponent', () => {
  let component: AnnonceurStatistiqueComponent;
  let fixture: ComponentFixture<AnnonceurStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceurStatistiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceurStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

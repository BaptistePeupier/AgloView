import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnonceursComponent } from './list-annonceurs.component';

describe('ListAnnonceurComponent', () => {
  let component: ListAnnonceursComponent;
  let fixture: ComponentFixture<ListAnnonceursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnnonceursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnnonceursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

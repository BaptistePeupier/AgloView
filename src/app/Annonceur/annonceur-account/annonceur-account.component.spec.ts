import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceurAccountComponent } from './annonceur-account.component';

describe('AnnonceurAccountComponent', () => {
  let component: AnnonceurAccountComponent;
  let fixture: ComponentFixture<AnnonceurAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceurAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceurAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

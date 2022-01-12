import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPComponent } from './new-p.component';

describe('NewPComponent', () => {
  let component: NewPComponent;
  let fixture: ComponentFixture<NewPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

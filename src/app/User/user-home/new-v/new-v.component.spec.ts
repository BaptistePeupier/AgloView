import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVComponent } from './new-v.component';

describe('NewVComponent', () => {
  let component: NewVComponent;
  let fixture: ComponentFixture<NewVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

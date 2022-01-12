import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistPopupComponent } from './playlist-popup.component';

describe('NewPComponent', () => {
  let component: PlaylistPopupComponent;
  let fixture: ComponentFixture<PlaylistPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

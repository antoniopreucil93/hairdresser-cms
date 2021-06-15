import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairsalonProfileComponent } from './hairsalon-profile.component';

describe('HairsalonProfileComponent', () => {
  let component: HairsalonProfileComponent;
  let fixture: ComponentFixture<HairsalonProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HairsalonProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HairsalonProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

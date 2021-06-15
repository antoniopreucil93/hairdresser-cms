import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairSalonsComponent } from './hair-salons.component';

describe('HairSalonsComponent', () => {
  let component: HairSalonsComponent;
  let fixture: ComponentFixture<HairSalonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HairSalonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HairSalonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

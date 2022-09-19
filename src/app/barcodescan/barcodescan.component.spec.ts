import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodescanComponent } from './barcodescan.component';

describe('BarcodescanComponent', () => {
  let component: BarcodescanComponent;
  let fixture: ComponentFixture<BarcodescanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodescanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodescanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

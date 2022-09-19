import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserallergiesComponent } from './userallergies.component';

describe('UserallergiesComponent', () => {
  let component: UserallergiesComponent;
  let fixture: ComponentFixture<UserallergiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserallergiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserallergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

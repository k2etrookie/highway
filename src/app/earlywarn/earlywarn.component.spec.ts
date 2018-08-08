import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlywarnComponent } from './earlywarn.component';

describe('EarlywarnComponent', () => {
  let component: EarlywarnComponent;
  let fixture: ComponentFixture<EarlywarnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarlywarnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarlywarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

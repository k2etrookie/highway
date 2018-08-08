import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamngComponent } from './datamng.component';

describe('DatamngComponent', () => {
  let component: DatamngComponent;
  let fixture: ComponentFixture<DatamngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatamngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatamngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

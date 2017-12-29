import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDataComponent } from './log-data.component';

describe('LogDataComponent', () => {
  let component: LogDataComponent;
  let fixture: ComponentFixture<LogDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPortModalComponent } from './select-port-modal.component';

describe('SelectPortModalComponent', () => {
  let component: SelectPortModalComponent;
  let fixture: ComponentFixture<SelectPortModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPortModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPortModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

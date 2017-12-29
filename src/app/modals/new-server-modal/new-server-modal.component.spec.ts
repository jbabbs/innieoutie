import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServerModalComponent } from './new-server-modal.component';

describe('NewServerModalComponent', () => {
  let component: NewServerModalComponent;
  let fixture: ComponentFixture<NewServerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewServerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

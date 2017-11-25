import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageModalComponent } from './new-message-modal.component';

describe('NewMessageModalComponent', () => {
  let component: NewMessageModalComponent;
  let fixture: ComponentFixture<NewMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesTabComponent } from './messages-tab.component';

describe('MessagesTabComponent', () => {
  let component: MessagesTabComponent;
  let fixture: ComponentFixture<MessagesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

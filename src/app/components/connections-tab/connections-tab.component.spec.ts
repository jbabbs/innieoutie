import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsTabComponent } from './connections-tab.component';

describe('ConnectionsTabComponent', () => {
  let component: ConnectionsTabComponent;
  let fixture: ComponentFixture<ConnectionsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersTabComponent } from './servers-tab.component';

describe('ServersTabComponent', () => {
  let component: ServersTabComponent;
  let fixture: ComponentFixture<ServersTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

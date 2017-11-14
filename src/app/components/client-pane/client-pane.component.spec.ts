import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaneComponent } from './client-pane.component';

describe('ClientPaneComponent', () => {
  let component: ClientPaneComponent;
  let fixture: ComponentFixture<ClientPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxiesTabComponent } from './proxies-tab.component';

describe('ProxiesTabComponent', () => {
  let component: ProxiesTabComponent;
  let fixture: ComponentFixture<ProxiesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxiesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxiesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProxyModalComponent } from './new-proxy-modal.component';

describe('NewProxyModalComponent', () => {
  let component: NewProxyModalComponent;
  let fixture: ComponentFixture<NewProxyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProxyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProxyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

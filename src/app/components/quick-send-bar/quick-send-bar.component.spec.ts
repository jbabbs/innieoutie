import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSendBarComponent } from './quick-send-bar.component';

describe('QuickSendBarComponent', () => {
  let component: QuickSendBarComponent;
  let fixture: ComponentFixture<QuickSendBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSendBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSendBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

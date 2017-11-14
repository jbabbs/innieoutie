import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConnectionModalComponent } from './new-connection-modal.component';

describe('NewConnectionModalComponent', () => {
  let component: NewConnectionModalComponent;
  let fixture: ComponentFixture<NewConnectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConnectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConnectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

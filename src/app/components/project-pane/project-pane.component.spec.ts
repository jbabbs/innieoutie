import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPaneComponent } from './project-pane.component';

describe('ProjectPaneComponent', () => {
  let component: ProjectPaneComponent;
  let fixture: ComponentFixture<ProjectPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

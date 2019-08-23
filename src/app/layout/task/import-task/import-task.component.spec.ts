import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTaskComponent } from './import-task.component';

describe('ImportTaskComponent', () => {
  let component: ImportTaskComponent;
  let fixture: ComponentFixture<ImportTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

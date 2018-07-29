import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPasswordsComponent } from './view-passwords.component';

describe('ViewPasswordsComponent', () => {
  let component: ViewPasswordsComponent;
  let fixture: ComponentFixture<ViewPasswordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPasswordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPasswordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

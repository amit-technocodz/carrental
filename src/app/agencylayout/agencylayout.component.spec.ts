import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencylayoutComponent } from './agencylayout.component';

describe('AgencylayoutComponent', () => {
  let component: AgencylayoutComponent;
  let fixture: ComponentFixture<AgencylayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencylayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencylayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

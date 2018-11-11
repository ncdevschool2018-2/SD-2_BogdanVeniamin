import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdditionComponent } from './new-addition.component';

describe('NewAdditionComponent', () => {
  let component: NewAdditionComponent;
  let fixture: ComponentFixture<NewAdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

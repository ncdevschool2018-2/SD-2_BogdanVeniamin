import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdditionPageComponent } from './new-addition-page.component';

describe('NewAdditionPageComponent', () => {
  let component: NewAdditionPageComponent;
  let fixture: ComponentFixture<NewAdditionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdditionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdeckComponent } from './newdeck.component';

describe('NewdeckComponent', () => {
  let component: NewdeckComponent;
  let fixture: ComponentFixture<NewdeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewdeckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewdeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

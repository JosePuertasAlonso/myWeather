import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWeatherhourComponent } from './card-weatherhour.component';

describe('CardWeatherhourComponent', () => {
  let component: CardWeatherhourComponent;
  let fixture: ComponentFixture<CardWeatherhourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardWeatherhourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWeatherhourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

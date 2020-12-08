import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogClockComponent } from './analog-clock.component';
import { MockComponent } from 'ng-mocks';
import { CustomAnalogTimeInputComponent } from '../custom-analog-time-input/custom-analog-time-input.component';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By, DomSanitizer } from '@angular/platform-browser';

describe('AnalogClockComponent', () => {
  let component: AnalogClockComponent;
  let fixture: ComponentFixture<AnalogClockComponent>;
  let sanitization: DomSanitizer;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalogClockComponent, 
      MockComponent(CustomAnalogTimeInputComponent)
    ],
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatOptionModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should style hour hand with rotation animation', () => {
    fixture.detectChanges();
    const hourHand = fixture.debugElement.query(By.css('.hour-hand'));
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const rotation = `rotate(${(((hour) * 30) + (minute * 0.5) + (second * (0.5 / 60)) +90).toFixed(3)}deg)`;
    expect(hourHand.nativeElement.style.transform).toBe(rotation);
  });
});

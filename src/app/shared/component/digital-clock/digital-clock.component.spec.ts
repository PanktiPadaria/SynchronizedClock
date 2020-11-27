import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ClockService } from '../../services/clock/clock.service';

import { DigitalClockComponent } from './digital-clock.component';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;
  let originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalClockComponent ],
      imports: [MatSelectModule, MatFormFieldModule, MatOptionModule, MatInputModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    fixture = TestBed.createComponent(DigitalClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should set the selected value in dropdown', async (done) => {
    const fixtureDebugElement = fixture.debugElement;
    // open options dialog
    const matSelect = fixtureDebugElement.query(By.css('.mat-select-trigger')).nativeElement;
    matSelect.click();
    fixture.detectChanges();
    // select the first option (use queryAll if you want to chose an option)
    const matOption = fixtureDebugElement.queryAll(By.css('.mat-option'));
    const hour = new Date().getHours();
    matOption[hour].nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(async () => {
       const inputElement: HTMLElement = fixtureDebugElement.query(By.css('.mat-option-text')).nativeElement;
       console.log(inputElement);
       expect(matOption[hour].nativeElement.getAttribute('ng-reflect-value')).toContain(hour.toString());
    });
    done();
  }, 1000);
  
  it('should display correct footnote text', () => {
    let el = fixture.debugElement.query(By.css('.footnote'));
    let spanEl = el.nativeElement;
    expect(spanEl.innerHTML).toContain(component.footNote);
  });
  
});

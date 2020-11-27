import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatInputModule, MatOption, MatOptionModule, MatSelectModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomAnalogTimeInputComponent } from './custom-analog-time-input.component';

describe('CustomAnalogTimeInputComponent', () => {
  let component: CustomAnalogTimeInputComponent;
  let fixture: ComponentFixture<CustomAnalogTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAnalogTimeInputComponent],
      imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAnalogTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the length of hour dropdown', async () => {

    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      const inquiryOptions = fixture.debugElement.queryAll(By.css('.mat-option-text'));
      expect(inquiryOptions.length).toEqual(24);
    });
  });

 it('should set the selected value in dropdown', (done) => {
    const fixtureDebugElement = fixture.debugElement;
    const matSelect = fixtureDebugElement.query(By.css('.mat-select-trigger')).nativeElement;
    matSelect.click();
    fixture.detectChanges();
    const matOption = fixtureDebugElement.queryAll(By.css('.mat-option'));
    const hour = new Date().getHours();
    matOption[hour].nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
       const inputElement: HTMLElement = fixtureDebugElement.query(By.css('.mat-option-text')).nativeElement;
       console.log(inputElement);
       expect(matOption[hour].nativeElement.getAttribute('ng-reflect-value')).toContain(hour.toString());
    });
    done();
  });
});

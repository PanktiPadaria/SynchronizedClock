import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { AnalogClockComponent } from '../app/shared/component/analog-clock/analog-clock.component';
import { DigitalClockComponent } from '../app/shared/component/digital-clock/digital-clock.component';
import { CustomAnalogTimeInputComponent } from '../app/shared/component/custom-analog-time-input/custom-analog-time-input.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent(AnalogClockComponent),
        MockComponent(DigitalClockComponent),
        MockComponent(CustomAnalogTimeInputComponent)
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SynchronizedClock'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('SynchronizedClock');
  });
  
  it(`should have page title as 'Synchronized Clock'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Synchronized Clock');
  })
});

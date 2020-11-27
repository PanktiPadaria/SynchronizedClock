import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { StandardTime } from 'src/app/models/standard-time';
import { ClockService } from 'src/app/shared/services/clock/clock.service';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
export class AnalogClockComponent implements OnInit, OnDestroy {

  currentTime: StandardTime;
  hourHandStyle: SafeStyle;
  minuteHandStyle: SafeStyle;
  secondHandStyle: SafeStyle;
  subscription: Subscription;

  constructor(private clockService: ClockService, private sanitization: DomSanitizer) { }

  ngOnInit() {
   this.startAnalogClock();
  }
  setClockAnimation() {
    this.hourHandStyle = this.sanitization.bypassSecurityTrustStyle(`rotate(${(this.currentTime.hour * 30) + (this.currentTime.minute * 0.5) + (this.currentTime.second * (0.5 / 60)) +90}deg)`);

    this.minuteHandStyle = this.sanitization.bypassSecurityTrustStyle(`rotate(${(this.currentTime.minute * 6) + (this.currentTime.second * 0.1) + 90}deg)`);

    this.secondHandStyle = this.sanitization.bypassSecurityTrustStyle(`rotate(${(this.currentTime.second * 6) + 90}deg)`);
  
  }

  startAnalogClock() {
    this.subscription = this.clockService.startClock().subscribe(() => {
      this.currentTime = this.clockService.incClock();
      this.setClockAnimation();
    });
  }

  setNewTime(event: any){
    this.subscription.unsubscribe();
    this.clockService.setNewTime(event, 'analog');
    this.startAnalogClock();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

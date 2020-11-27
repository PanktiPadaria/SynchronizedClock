import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { StandardTime } from 'src/app/models/standard-time';
import { ClockService } from '../../services/clock/clock.service';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DigitalClockComponent implements OnInit, OnDestroy {

  currentTime: StandardTime;
  subscription: Subscription
  hours: Array<number>;
  minutes: Array<number>;
  seconds: Array<number>;
  footNote : string;


  constructor(private clockService: ClockService, private sanitization: DomSanitizer) {
    this.currentTime = new StandardTime();
    this.currentTime.hour = 0;
    this.currentTime.minute = 0;
    this.currentTime.second = 0;
    this.hours = Array(24).fill(0).map((x,h) => h < 10 ? +"0" + h : h);
    this.minutes = Array(60).fill(0).map((x,m) => m < 10 ? +"0" + m : m);
    this.seconds = Array(60).fill(0).map((x,s) => s < 10 ? +"0" + s : s);
    this.footNote = 'Click on HH, MM, SS to change the time of digital clock';
   }

  ngOnInit() {
   this.startDigitalClock();
  }

  startDigitalClock() {
    this.subscription = this.clockService.startClock().subscribe(() => {
      this.currentTime = this.clockService.incClock();
    });
  }

  setNewTime(event: any, eventType: string){
    this.subscription.unsubscribe();
    this.clockService.setNewTime(event, 'digital', eventType);
    this.startDigitalClock();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { StandardTime } from './models/standard-time';
import { ClockService } from './shared/services/clock/clock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SynchronizedClock';
  subscription: Subscription;
  currentTime: StandardTime
  constructor(private clockService: ClockService) { }
  
  ngOnInit(){
     this.initializeClock();
  }
  
  initializeClock() {
    this.subscription = this.clockService.startClock().subscribe(() => {
      this.currentTime = this.clockService.incClock();
      this.clockService.setTime(this.currentTime);
    });
  }

  updateClockTime(event: any) {
    this.subscription.unsubscribe();
    this.clockService.setNewTime(event);
    this.initializeClock();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

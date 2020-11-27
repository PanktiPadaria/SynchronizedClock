import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StandardTime } from 'src/app/models/standard-time';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  subscription: Subscription;
  standardTime: StandardTime;
  constructor() {
    this.standardTime = new StandardTime();
    const currentdate = new Date();
    this.standardTime.hour = currentdate.getHours();
    this.standardTime.minute = currentdate.getMinutes();
    this.standardTime.second = currentdate.getSeconds();
    this.standardTime.currenTime = currentdate.getTime();
   }

  incClock() {
    this.standardTime.currenTime = this.standardTime.currenTime + 1000;
    var date = new Date(this.standardTime.currenTime);
    this.standardTime.hour = date.getHours();
    this.standardTime.minute = date.getMinutes();
    this.standardTime.second = date.getSeconds();
    this.standardTime.currenTime = date.getTime();
    return this.standardTime;
  }

  startClock() {
    return interval(1000);
  }

  setNewTime(event: any, clockType: string, eventType?: string) {
    eventType = clockType.toLocaleLowerCase() == 'analog' ? event.type : eventType;
    switch (eventType.toLocaleLowerCase()) {
      case 'hour': this.standardTime.hour = this.getEventValue(event);
        break;
      case 'minute': this.standardTime.minute = this.getEventValue(event);
        break;
      case 'second': this.standardTime.second = this.getEventValue(event);
        break;
    }
    this.standardTime.currenTime = new Date(2020, 11, 25, this.standardTime.hour, this.standardTime.minute, this.standardTime.second).getTime();
  }

  getEventValue(event: any) {
    return event.value;
  }
}

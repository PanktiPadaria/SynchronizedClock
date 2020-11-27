import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomTime } from '../../../models/custom-time';

@Component({
  selector: 'app-custom-analog-time-input',
  templateUrl: './custom-analog-time-input.component.html',
  styleUrls: ['./custom-analog-time-input.component.scss']
})
export class CustomAnalogTimeInputComponent implements OnInit {

  hours: Array<number>;
  minutes: Array<number>;
  seconds: Array<number>;
  selectedtHour: any;
  selectedMinute: any;
  selectedSecond: any;
  @Output() onTimeChange: EventEmitter<CustomTime> = new EventEmitter();
  customTime: CustomTime;

  constructor() { 
    this.customTime = new CustomTime();
    this.selectedtHour = new Date().getHours();
    this.selectedMinute = new Date().getMinutes();
    this.selectedSecond = new Date().getSeconds();
    this.hours = Array(24).fill(0).map((x,h) => h < 10 ? +"0" + h : h);
    this.minutes = Array(60).fill(0).map((x,m) => m < 10 ? +"0" + m : m);
    this.seconds = Array(60).fill(0).map((x,s) => s < 10 ? +"0" + s : s);
  }

  ngOnInit() {
  }

  sendUpdatedTime(type: string) {
    switch(type.toLocaleLowerCase()) {
      case 'hour': this.customTime.value = this.selectedtHour;
      break;
      case 'minute': this.customTime.value = this.selectedMinute;
      break;
      case 'second': this.customTime.value = this.selectedSecond;
      break;
    }
    this.customTime.type = type.toLocaleLowerCase();
    this.onTimeChange.emit(this.customTime);
  }

}

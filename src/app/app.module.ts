import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomAnalogTimeInputComponent } from './shared/component/custom-analog-time-input/custom-analog-time-input.component';
import { MatSelectModule, MatInputModule, MatFormFieldModule, MatOptionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from "@angular/flex-layout";
import { AnalogClockComponent } from './shared/component/analog-clock/analog-clock.component';
import { DigitalClockComponent } from './shared/component/digital-clock/digital-clock.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomAnalogTimeInputComponent,
    AnalogClockComponent,
    DigitalClockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

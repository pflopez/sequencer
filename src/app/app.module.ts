import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SequencerComponent } from './sequencer/sequencer.component';
import { ControlsComponent } from './controls/controls.component';
import { RepeaterPipe } from './pipes/repeater.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SequencerComponent,
    ControlsComponent,
    RepeaterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

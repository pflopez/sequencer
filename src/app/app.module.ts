import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SequencerModule} from "pl-sequencer";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SequencerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

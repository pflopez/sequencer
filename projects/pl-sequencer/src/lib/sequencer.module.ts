import {NgModule} from '@angular/core';
import {SequencerComponent} from './components/sequencer/sequencer.component';
import {RepeaterPipe} from "./pipes/repeater.pipe";
import {TracksComponent} from './components/tracks/tracks.component';
import {CommonModule} from "@angular/common";
import {ControlsComponent} from "./components/controls/controls.component";
import {KnobComponent} from './components/knob/knob.component';


@NgModule({
  declarations: [
    SequencerComponent,
    RepeaterPipe,
    TracksComponent,
    ControlsComponent,
    KnobComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SequencerComponent,
  ]
})
export class SequencerModule {
}

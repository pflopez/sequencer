import {Component} from '@angular/core';
import {ClockService} from "../services/clock.service";
import {InstrumentLine} from "../models/instrument-line";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sequencer';

  instruments = [
    new InstrumentLine('kick', [1, 0, 0, 0], this.clockService.currentStep$, 24),
    new InstrumentLine('snare', [0, 0, 1, 0], this.clockService.currentStep$, 8),
    new InstrumentLine('hit-hat', [1, 0, 1, 0], this.clockService.currentStep$, 10),
    new InstrumentLine('ride', [1, 0, 0, 0, 1, 0, 1, 0], this.clockService.currentStep$),
  ]



  constructor(private clockService: ClockService) {
  }


}

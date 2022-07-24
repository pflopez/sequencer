import {Component} from '@angular/core';
import {SequencerService} from "../services/sequencer.service";
import {InstrumentLine} from "../models/instrument-line";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sequencer';
  activeStep$ = this.sequencer.currentStep$;
  bpm$ = this.sequencer.bpm$;

  instruments = [
    new InstrumentLine('kick', [1, 0, 0, 0], this.sequencer.currentStep$, 24),
    new InstrumentLine('snare', [0, 0, 1, 0], this.sequencer.currentStep$, 8),
    new InstrumentLine('hit-hat', [1, 0, 1, 0], this.sequencer.currentStep$, 10),
    new InstrumentLine('ride', [1, 0, 0, 0, 1, 0, 1, 0], this.sequencer.currentStep$),
  ]

  play() {
    this.sequencer.run();
  }

  stop() {
    this.sequencer.stop();
  }

  constructor(private sequencer: SequencerService) {
  }

  changeBpm(bpm: string) {
    const num = Number(bpm);
    this.sequencer.updateBpm(num);
  }
}

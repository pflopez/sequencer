import {Component} from '@angular/core';
import {SequencerService} from "../services/sequencer.service";
import {InstrumentLine} from "../models/step";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sequencer';
  activeStep$ = this.sequencer.activeStep$;
  bpm$ = this.sequencer.bpm$;

  instruments = [
    new InstrumentLine('kick', [1, 0, 0, 0]),
    new InstrumentLine('snare', [0, 0, 1, 0]),
    new InstrumentLine('hit-hat', [1, 0, 1, 0]),
    new InstrumentLine('ride', [1, 0, 0, 0, 1, 0, 1, 0]),
  ]

  play() {
    this.sequencer.run();
  }

  stop() {
    this.sequencer.stop();
  }

  constructor(private sequencer: SequencerService) {
  }

  changeBpm(bpm: string){
    const num = Number(bpm);
    this.sequencer.updateBpm(num);
  }
}

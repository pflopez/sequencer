import { Component } from '@angular/core';
import {SequencerService} from "../services/sequencer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sequencer';

  play(){
    this.sequencer.run();
  }

  stop(){
    this.sequencer.stop();
  }

  activeStep$ = this.sequencer.activeStep$;

  constructor(private sequencer: SequencerService) {
  }

}

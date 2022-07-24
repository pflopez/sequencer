import { Injectable } from '@angular/core';
import {SequencerService} from "./sequencer.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player$ = this.sequencer.currentStep$.subscribe(activeStep => this.play(activeStep));

  constructor(private sequencer: SequencerService) { }

  play(step: number){

  }
}

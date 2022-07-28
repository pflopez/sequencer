import { Injectable } from '@angular/core';
import {ClockService} from "./clock.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player$ = this.sequencer.currentStep$.subscribe(activeStep => this.play(activeStep));

  constructor(private sequencer: ClockService) { }

  play(step: number){

  }
}

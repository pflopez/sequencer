import { Component, OnInit } from '@angular/core';
import {Track} from "../../models/track";
import {ClockService} from "../../services/clock.service";

@Component({
  selector: 'pl-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent  {
  title = 'sequencer';

  // remove and provide as input?
  tracks = [
    new Track('kick', [1, 0, 0, 0], this.clockService.currentStep$, 16),
    new Track('snare', [0, 0, 1, 0], this.clockService.currentStep$, 8),
    new Track('hit-hat', [2, 0, 1, 0], this.clockService.currentStep$, 10),
    new Track('ride', [3, 0, 0, 0, 1, 0, 1, 0], this.clockService.currentStep$),
  ]

  velocity = 1 ;


  constructor(private clockService: ClockService) {
  }
  updateVelocity(velocity: number){
    this.velocity = velocity;
  }
}

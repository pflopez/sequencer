import {Component, Input } from '@angular/core';
import {Track} from "../../models/track";

@Component({
  selector: 'pl-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent {
  @Input() tracks: Track[] = [];
  @Input() showTrackName = true;
  @Input() showTrackLength = true;
  @Input() showActiveStepBar = true;


  velocity = 1;


  constructor() {
  }

  updateVelocity(velocity: number) {
    this.velocity = velocity;
  }
}

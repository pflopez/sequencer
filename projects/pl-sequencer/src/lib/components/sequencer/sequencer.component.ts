import {Component, Input, OnInit} from '@angular/core';
import {Track} from "../../models/track";
import {ClockService} from "../../services/clock.service";

@Component({
  selector: 'pl-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {
  @Input() tracks: Track[] = [];
  @Input() showTrackName = true;
  @Input() showTrackLength = true;
  @Input() showActiveStepBar = true;


  velocity = 1;


  constructor(private clockService: ClockService) {
  }

  updateVelocity(velocity: number) {
    this.velocity = velocity;
  }

  ngOnInit(): void {
    this.tracks.forEach(t => t.subscribeToStep(this.clockService.currentStep$))
  }
}

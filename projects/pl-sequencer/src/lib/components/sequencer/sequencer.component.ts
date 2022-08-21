import {Component, Input, OnInit} from '@angular/core';
import {Track} from "../../models/track";
import {ClockService} from "../../services/clock.service";
import {TrackData} from "../../models/interfaces";

@Component({
  selector: 'pl-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss'],
  providers: [ClockService]
})
export class SequencerComponent implements OnInit{
  @Input() tracksData: TrackData[] = [];
  tracks: Track[] = [];

  @Input() showTrackName = true;
  @Input() showTrackLength = true;
  @Input() showActiveStepBar = true;


  velocity = 1;


  constructor(private clock: ClockService) {
  }

  updateVelocity(velocity: number) {
    this.velocity = velocity;
  }

  createTracks(tracksData: TrackData[]) {
    this.tracks = tracksData.map(trackData => new Track(trackData, this.clock.currentStep$))
  }

  ngOnInit(): void {
    this.createTracks(this.tracksData);
  }
}

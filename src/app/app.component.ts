import {Component} from '@angular/core';
import {PlSequencerService, createTrackData} from "pl-sequencer";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tracks = this.sequencer.tracks;

  constructor(private sequencer: PlSequencerService) {

    this.tracks = this.sequencer.createTracks([
      createTrackData('kick', 'assets/sounds/1/kick.wav', [1, 0, 0, 0], 16),
      createTrackData('snare', 'assets/sounds/1/snare.wav', [0, 0, 1, 0], 8),
      createTrackData('hit-hat', 'assets/sounds/1/lev.wav', [2, 0, 1, 0], 10),
      createTrackData('tom', 'assets/sounds/1/odd.wav', [3, 0, 0, 0, 1, 0, 1, 0]),
    ])
  }
}
